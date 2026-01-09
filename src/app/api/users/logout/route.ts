import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get("jwtToken");
    
    if (!jwtCookie) {
      return NextResponse.json(
        { 
          message: "You are not logged in",
          success: false,
          alreadyLoggedOut: true
        },
        { status: 200 } 
      );
    }
    
    cookieStore.delete({
      name: "jwtToken",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    
    return NextResponse.json(
      { 
        message: "Logged out successfully",
        success: true,
        alreadyLoggedOut: false
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        success: false
      },
      { status: 500 }
    );
  }
}