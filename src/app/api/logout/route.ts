// /app/api/logout/route.ts (Next.js 14 App Router API route)

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Get the refresh token from cookies
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token found" },
        { status: 400 }
      );
    }

    // Call the auth/logout endpoint with the refresh token
    const response = await fetch(`${process.env.BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to logout" },
        { status: response.status }
      );
    }

    // Create response with success message
    const logoutResponse = NextResponse.json({
      message: "Logged out successfully"
    });

    // Delete the refresh token cookie
    logoutResponse.cookies.set("refreshToken", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
      sameSite: "strict",
      secure: true
    });

    return logoutResponse;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
