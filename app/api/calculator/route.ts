import { NextResponse } from "next/server";
import { saveCalculatorResults } from "@/services/calculator.service";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
      return NextResponse.json(
        { success: false, message: "Invalid calculator payload" },
        { status: 400 }
      );
    }

    // Save calculator results using our calculator service
    const { shareId, timestamp } = saveCalculatorResults(payload as Record<string, unknown>);
    
    // Return success response with share URL
    return NextResponse.json({
      success: true,
      shareId,
      timestamp,
      shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sethbrand.com'}/tools/marketing-calculator/share/${shareId}`,
      results: payload
    });
  } catch (error) {
    console.error("Error processing calculator results:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process calculator results" },
      { status: 500 }
    );
  }
}