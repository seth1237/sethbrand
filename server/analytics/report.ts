import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/services/email.service"
import { getDb } from "@/lib/mongo"

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

interface GroupedCount {
  _id: string | null
  count: number
}

const authorize = (req: NextRequest) => {
  const secret = process.env.CRON_SECRET
  if (!secret) return true
  const provided = req.headers.get("x-cron-secret")
  return provided === secret
}

export async function handleWeeklyReport(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }

  try {
    const db = await getDb()
    const since = new Date(Date.now() - ONE_WEEK_MS)

    const pageViews = db.collection("pageViews")
    const leads = db.collection("leads")

    const [totalViews, totalLeads, topPages, topReferrers, recentLeads] = await Promise.all([
      pageViews.countDocuments({ createdAt: { $gte: since } }),
      leads.countDocuments({ createdAt: { $gte: since } }),
      pageViews
        .aggregate<GroupedCount>([
          { $match: { createdAt: { $gte: since } } },
          { $group: { _id: "$path", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ])
        .toArray(),
      pageViews
        .aggregate<GroupedCount>([
          { $match: { createdAt: { $gte: since } } },
          { $group: { _id: "$referrer", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ])
        .toArray(),
      leads.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(10).toArray(),
    ])

    const formatList = (items: GroupedCount[]) =>
      items
        .filter((item) => !!item._id)
        .map((item) => `<li><strong>${item._id}</strong> — ${item.count}</li>`)
        .join("")

    const leadsHtml = recentLeads
      .map((lead) => {
        const submitted = lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ""
        return `<li><strong>${lead.name}</strong> (${lead.email}) — ${lead.serviceType || lead.service || "N/A"} — ${submitted}</li>`
      })
      .join("")

    const html = `
      <h2>Weekly Web Analytics & Leads</h2>
      <p>Reporting period: last 7 days (since ${since.toLocaleString()}).</p>
      <ul>
        <li><strong>Total page views:</strong> ${totalViews}</li>
        <li><strong>Total leads:</strong> ${totalLeads}</li>
      </ul>
      <h3>Top Pages</h3>
      <ol>${formatList(topPages)}</ol>
      <h3>Top Referrers</h3>
      <ol>${formatList(topReferrers)}</ol>
      <h3>Recent Leads</h3>
      <ul>${leadsHtml || "<li>No leads in the last week.</li>"}</ul>
    `

    const text =
      `Weekly Web Analytics & Leads\n\n` +
      `Period start: ${since.toLocaleString()}\n` +
      `Total page views: ${totalViews}\n` +
      `Total leads: ${totalLeads}\n\n` +
      `Top pages:\n${topPages.map((p) => `- ${p._id}: ${p.count}`).join("\n")}\n\n` +
      `Top referrers:\n${topReferrers.map((r) => `- ${r._id}: ${r.count}`).join("\n")}\n\n` +
      `Recent leads:\n${recentLeads.map((lead) => `- ${lead.name} (${lead.email}) — ${lead.serviceType || lead.service || "N/A"}`).join("\n")}`

    const recipients = [process.env.REPORT_EMAIL, process.env.ADMIN_EMAIL, "makoriseth1237@gmail.com"].filter(Boolean).join(",")

    const emailResult = await sendEmail({
      to: recipients,
      from: process.env.EMAIL_FROM || "no-reply@sethbrand.com",
      subject: "Weekly Web Analytics & Leads",
      html,
      text,
    })

    if (!emailResult.success) {
      throw emailResult.error || new Error("Failed to send report email")
    }

    return NextResponse.json({ success: true, totalViews, totalLeads })
  } catch (error) {
    console.error("Weekly analytics report failed", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
