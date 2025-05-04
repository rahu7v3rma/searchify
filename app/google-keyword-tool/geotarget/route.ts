import { NextRequest, NextResponse } from "next/server";
import { getGeotargets } from "../../../utils/mongoose";
// import { sendAdminMail } from "../../../utils/email";

export async function POST(request: NextRequest) {
  try {
    let requestBody = await request.json();

    if (!requestBody.canonicalName) {
      return NextResponse.json({
        success: true,
        message: "Geotargets fetched successfully",
        data: [],
      });
    }

    let canonicalName = String(requestBody?.canonicalName);

    const result = await getGeotargets(canonicalName);

    return NextResponse.json({
      success: true,
      message: "Geotargets fetched successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      "google-keyword-tool/api/route GET error: " + JSON.stringify(error);
    console.error(errorMessage);
    // await sendAdminMail(errorMessage);
    return NextResponse.json(
      { success: false, message: errorMessage, data: null },
      { status: 500 }
    );
  }
}
