import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  email: string;
  role: string;
}

type AuthState = {
  accessToken: string | null;
  user: User | null;
  deviceToken: string | null;
  isHydrated: boolean;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  setDeviceToken: (token: string | null) => void;
  setHydrated: (hydrated: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      deviceToken: null,
      isHydrated: false,
      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      setDeviceToken: (token) => set({ deviceToken: token }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      clearAuth: () => set({ accessToken: null, user: null, deviceToken: null })
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        deviceToken: state.deviceToken
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      }
    }
  )
);
