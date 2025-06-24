/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

const BASE_URL = process.env.BASE_URL;

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  if (role !== "admin" && role !== "manager") {
    return new Response(JSON.stringify({ error: "Invalid role" }), {
      status: 400
    });
  }

  // Choose backend endpoint based on role
  const backendEndpoint = `${BASE_URL}/auth/login`;
  console.log("backendEndpoint", backendEndpoint);
  // Call backend login API
  const backendRes = await fetch(backendEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });

  if (!backendRes.ok) {
    console.log("backendRes bad", backendRes);
    const errorData = await backendRes.json();
    return new Response(
      JSON.stringify({ error: errorData.message || "Invalid credentials" }),
      {
        status: backendRes.status
      }
    );
  }
  console.log("backendRes", backendRes);

  const { data } = await backendRes.json();
  console.log("backendRes data", data);

  const refreshToken = data.tokens.refreshToken;
  const accessToken = data.tokens.accessToken;
  const user = data.user;

  const response = new Response(
    JSON.stringify({ message: "Logged in", accessToken, user }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );

  // Set refresh token as HttpOnly cookie
  response.headers.append(
    "Set-Cookie",
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict; Secure`
  );

  return response;
}
