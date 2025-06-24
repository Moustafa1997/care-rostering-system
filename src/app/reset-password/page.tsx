"use client";
// ADD THIS LINE:
export const dynamic = 'force-dynamic';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get("token") || "";
  const apiRole = searchParams?.get("role") as "admin" | "manager";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const { resetPassword, loading, error, data } = useResetPassword(apiRole);
  const { success, error: showError } = useToast();

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Invalid Reset Link
          </h1>
          <p className="text-center text-gray-600">
            This password reset link is invalid or has expired. Please request a
            new password reset link.
          </p>
          <div className="mt-6 text-center">
            <Button
              variant="primary"
              onClick={() => router.push("/login")}
              className="w-[235px] h-[50px] text-base font-semibold"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Client-side validation function
  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number";
    }
    return null;
  };

  // Validate passwords on change
  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    const error = validatePassword(value);
    setValidationErrors((prev) => ({
      ...prev,
      newPassword: error || undefined
    }));
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value !== newPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }));
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous validation errors
    setValidationErrors({});

    // Client-side validation
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setValidationErrors((prev) => ({
        ...prev,
        newPassword: passwordError
      }));
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidationErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }));
      return;
    }

    try {
      const result = await resetPassword(token, newPassword, confirmPassword);
      if (result.status === "success") {
        success("Password reset successfully!");
        router.push("/login");
      }
    } catch (err) {
      // Error is handled by the hook and will be displayed
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <ImageComponent
            src="/images/reset-pass.svg"
            alt="reset-password"
            width={60}
            height={60}
          />
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">
            Reset Your Password
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Please enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  variant="bordered"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => handleNewPasswordChange(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  variant="bordered"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {validationErrors.newPassword && (
            <div className="text-red text-sm text-center">
              {validationErrors.newPassword}
            </div>
          )}
          {validationErrors.confirmPassword && (
            <div className="text-red text-sm text-center">
              {validationErrors.confirmPassword}
            </div>
          )}

          {error && (
            <div className="text-red text-sm text-center">{error.message}</div>
          )}

          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              className="w-[235px] h-[50px] text-base font-semibold"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
