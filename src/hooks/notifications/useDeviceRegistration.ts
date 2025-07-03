import { useApi } from "@/hooks/general/useApi";
import { useToast } from "@/hooks/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import {
  RegisterDeviceRequest,
  RegisterDeviceResponse,
  UnregisterDeviceResponse
} from "@/types/notification";

export function useRegisterDevice() {
  const { success, error: showError } = useToast();

  const result = useApi<RegisterDeviceResponse, RegisterDeviceRequest>(
    "/notifications/register-device",
    {
      method: "POST"
    }
  ) as UseMutationResult<RegisterDeviceResponse, any, RegisterDeviceRequest>;

  const registerDevice = async (deviceToken: string) => {
    try {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      await result.mutateAsync({
        fcmToken: deviceToken,
        deviceType: "web"
      });

      success("Device registered successfully");
    } catch (error) {
      showError("Failed to register device");
      throw error;
    }
  };

  return {
    registerDevice,
    isLoading: result.isPending,
    error: result.error
  };
}

export function useUnregisterDevice() {
  const { success, error: showError } = useToast();

  const result = useApi<UnregisterDeviceResponse>(
    "/notifications/unregister-device",
    {
      method: "DELETE"
    }
  ) as UseMutationResult<UnregisterDeviceResponse, any, void>;

  const unregisterDevice = async () => {
    try {
      await result.mutateAsync();
      success("Device unregistered successfully");
    } catch (error) {
      showError("Failed to unregister device");
      throw error;
    }
  };

  return {
    unregisterDevice,
    isLoading: result.isPending,
    error: result.error
  };
}
