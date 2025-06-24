/* eslint-disable prettier/prettier */
// src/services/authService.ts
export interface LoginResponse {
  token: string;
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    await sleep(3000); // wait for 3 seconds

    if (username === "test" && password === "test") {
      return { token: "dummy-token" };
    }
    throw new Error("Invalid credentials");
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password })
    // });

    // if (!res.ok) {
    //   // bubble up a clear error
    //   const message = (await res.json())?.error || "Invalid credentials";
    //   throw new Error(message);
    // }

    // return res.json();
  }

  static async logout() {
    await sleep(3000); // wait for 3 seconds

    document.cookie = "authToken=; Path=/; Max-Age=0; SameSite=Lax";
  }
}
