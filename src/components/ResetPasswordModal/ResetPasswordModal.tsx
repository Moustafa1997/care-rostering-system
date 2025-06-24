"use client";
import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageComponent from "../ImageComponent/ImageComponent";
import { useToast } from "@/hooks/use-toast";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResetPasswordModal({
  isOpen,
  onClose
}: ResetPasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { success, error } = useToast();

  if (!isOpen) return null;

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      error("New password and confirm password do not match");
      return;
    }
    success("Password updated successfully!");
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setNewPassword("");
    setConfirmPassword("");
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-[740px] p-8 bg-white rounded-md shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
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
            Update Password
          </h2>
          <p className="text-lg font-normal text-gray-500">
            Enter your new password to complete the reset process
          </p>
        </div>

        <form onSubmit={handleUpdatePassword}>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-normal text-darkBlueGray">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  variant="bordered"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-gray-sm"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-normal text-darkBlueGray">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  variant="bordered"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-gray-sm"
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

          <div className="mt-6 text-center">
            <Button
              type="submit"
              variant="primary"
              className="w-[235px] h-[50px] text-base font-semibold"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
