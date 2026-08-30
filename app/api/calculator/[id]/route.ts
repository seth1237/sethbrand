import { NextResponse } from "next/server";
import { getCalculatorResultsById } from "@/services/calculator.service";

// Dynamic route that handles GET requests for specific calculator results by ID
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing result ID" },
        { status: 400 }
      );
    }
    
    const result = getCalculatorResultsById(id);
    
    if (!result) {
      return NextResponse.json(
        { success: false, message: "Calculator result not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      shareId: result.shareId,
      timestamp: result.timestamp,
      data: result.data
    });
  } catch (error) {
    console.error("Error retrieving calculator results:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve calculator results" },
      { status: 500 }
    );
  }
}