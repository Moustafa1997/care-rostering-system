"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageComponent from "../ImageComponent/ImageComponent";
import { useToast } from "@/hooks/use-toast";
import { useForgotPassword } from "@/hooks/auth/useForgetPassword";
import { useRouter } from "next/navigation";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: "admin" | "manager";
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  role
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const { success, error: showError } = useToast();
  const { forgotPassword, loading, error } = useForgotPassword(role);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showError("Please enter your email address");
      return;
    }

    try {
      await forgotPassword(email);
      success("Reset code sent to your email. please check you email");
      handleClose();
    } catch (err) {
      // Error is handled by the hook and will be shown via toast
      console.error("Forgot password error:", err);
    }
  };

  const handleClose = () => {
    onClose();
    setEmail("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-[740px] p-8 bg-white rounded-md shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          disabled={loading}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-start">
          <ImageComponent
            src="/images/reset-pass.svg"
            alt="reset-password"
            width={60}
            height={60}
          />
          <h2 className="text-3xl font-normal text-gray-500 mt-8">
            Reset Password
          </h2>
          <p className="text-lg font-normal text-gray-500">
            Enter your email address and we will send you a code to reset your
            password
          </p>
        </div>

        <form onSubmit={handleSendResetCode}>
          <div className="mt-6">
            <label className="block mb-1 text-sm font-normal text-darkBlueGray">
              Email
            </label>
            <Input
              type="email"
              variant="bordered"
              placeholder="Enter email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm text-center">
              {error.message}
            </div>
          )}

          <div className="mt-6 text-center">
            <Button
              type="submit"
              variant="primary"
              className="w-[235px] h-[50px] text-base font-semibold"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset code"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
