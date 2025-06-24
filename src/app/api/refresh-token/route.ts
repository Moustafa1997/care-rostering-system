import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    console.log("=== Starting refresh token process ===");

    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    console.log("refresh token:", refreshToken);

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token not found in cookies" },
        { status: 401 }
      );
    }

    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("API base URL is not configured");
    }

    const apiUrl = `${baseUrl}/auth/refresh-tokens`;

    try {
      const apiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });

      const data = await apiResponse.json();
      console.log("Response data:", data);

      if (!apiResponse.ok) {
        // If the refresh token is invalid, clear it from cookies
        const response = NextResponse.json(
          { error: data.message || "Failed to refresh tokens" },
          { status: apiResponse.status }
        );

        // Clear the refresh token cookie
        response.cookies.set({
          name: "refreshToken",
          value: "",
          expires: new Date(0),
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict"
        });

        return response;
      }

      const responseHeaders = new Headers();
      responseHeaders.append(
        "Set-Cookie",
        `refreshToken=${data.refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`
      );
      // Create the response with the new access token
      const nextResponse = NextResponse.json({
        status: "success",
        message: "Token refreshed successfully",
        data: {
          accessToken: data.data.accessToken
        }
      });

      // Set the new refresh token cookie with proper attributes
      nextResponse.cookies.set({
        name: "refreshToken",
        value: data.data.refreshToken,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 // 30 days in seconds
      });

      console.log("=== Refresh token process completed successfully ===");
      return nextResponse;
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error("=== Error in refresh token process ===");
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to refresh tokens" },
      { status: 500 }
    );
  }
}
