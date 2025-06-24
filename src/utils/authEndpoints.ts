// src/utils/authEndpoints.ts
export type Role = "admin" | "contractor";
export type AuthAction =
  | "login"
  | "forgotPassword"
  | "resetPassword"
  | "updatePassword"
  | "updateInfo";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const AUTH_ENDPOINTS: Record<Role, Record<AuthAction, string>> = {
  admin: {
    login: `${BASE}/admin/login`,
    forgotPassword: `${BASE}/admin/forgot-password`,
    resetPassword: `${BASE}/admin/reset-password`,
    updatePassword: `${BASE}/admin/update-password`,
    updateInfo: `${BASE}/admin/update-info`
  },
  contractor: {
    login: `${BASE}/contractors/login`,
    forgotPassword: `${BASE}/contractors/forgot-password`,
    resetPassword: `${BASE}/contractors/reset-password`,
    updatePassword: `${BASE}/contractors/me/update-password`,
    updateInfo: `${BASE}/contractors/me/update-info`
  }
};
