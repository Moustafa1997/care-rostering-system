"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import ForgotPasswordModal from "@/components/ForgotPasswordModal/ForgotPasswordModal";
import { Role } from "@/utils/authEndpoints";

interface LoginFormProps {
  role: "admin" | "manager";
}

export default function LoginForm({ role }: LoginFormProps) {
  const { login, isLoading } = useLogin();
  const router = useRouter();
  const { error: showError } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  // Map UI role to API role
  const apiRole = role;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showError("Please enter both email and password");
      return;
    }

    try {
      await login({ email: username, password, role });
    } catch (err) {
      console.error("Login error in form:", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-normal text-darkBlueGray">Email</label>
          <Input
            type="email"
            variant="bordered"
            placeholder="Enter Email ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-normal text-darkBlueGray">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              variant="bordered"
              placeholder="Enter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-gray-sm"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgotPasswordModal(true)}
              className="text-sm font-normal text-darkBlueGray hover:underline"
              disabled={isLoading}
            >
              Forget your password?
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="w-[160px] h-[50px] text-base font-semibold"
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>

        {/* <div className="flex justify-center">
          <button
            type="button"
            onClick={() =>
              router.push(`/login/${role === "admin" ? "manager" : "admin"}`)
            }
            className="text-sm font-normal text-darkBlueGray hover:underline"
            disabled={isLoading}
          >
            Login as {role === "admin" ? "Manager" : "Admin"}
          </button>
        </div> */}
      </form>

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        role={apiRole}
      />
    </>
  );
}
