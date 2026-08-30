import { NextRequest } from "next/server"
import { handleWeeklyReport } from "@/server/analytics/report"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  return handleWeeklyReport(req)
}

export async function GET(req: NextRequest) {
  return POST(req)
}
