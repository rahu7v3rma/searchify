import { NextRequest, NextResponse } from "next/server";
import supabaseAdmin from "../../../../lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const accessToken = request.headers.get("authorization");
    if (!accessToken) throw { message: "Unauthorized" };

    const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
    if (error) throw { message: "Unauthorized" };

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      data.user.id
    );
    if (deleteError) throw { message: "Failed to delete user" };

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
