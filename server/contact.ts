import { NextRequest, NextResponse } from "next/server"
import { processContactForm } from "@/services/email.service"
import { getDb } from "@/lib/mongo"

export async function handleContact(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message, website } = body

    // Basic anti-spam: honeypot and human-time check
    if (website && website.trim().length > 0) {
      return NextResponse.json({ success: false, error: "Spam detected" }, { status: 400 })
    }
    // Validation for required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: "Name, email, phone number, and message are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Please provide a valid email address" }, { status: 400 })
    }

    // Ensure there's a message
    if (typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Please include a message" }, { status: 400 })
    }
    if (subject && typeof subject === "string" && subject.trim().length > 0 && subject.trim().length < 3) {
      return NextResponse.json({ success: false, error: "Subject must be at least 3 characters when provided" }, { status: 400 })
    }

    // Persist to MongoDB
    try {
      const db = await getDb()
      await db.collection("leads").insertOne({
        name,
        email,
        phone,
        subject: typeof subject === "string" ? subject.trim() : "",
        message: message.trim(),
        userAgent: req.headers.get("user-agent") || "unknown",
        createdAt: new Date(),
      })
    } catch (err) {
      console.error("Lead persistence failed:", err)
    }

    const result = await processContactForm({
      name,
      email,
      phone,
      subject: typeof subject === "string" ? subject.trim() : "",
      message: message.trim(),
    })

    if (result.success) {
      return NextResponse.json({ success: true, message: "Your request has been received. We'll be in touch soon!" })
    } else {
      console.error("Email sending failed:", result.error)
      return NextResponse.json(
        { success: false, message: "There was an issue processing your request. Please try again later." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return NextResponse.json({ error: "Failed to process your request. Please try again later." }, { status: 500 })
  }
}
