import localFont from "next/font/local";
import "@/styles/bundle.scss";
import { withMetadata } from "@/utils/metadata";
import { SITE_NAME } from "@/configs/env";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata = withMetadata({
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  }
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <NotificationProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  zIndex: 9999,
                  background: "#fff",
                  color: "#000",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  borderRadius: "8px",
                  padding: "16px"
                },
                duration: 3000,
                className: "toast-notification"
              }}
            />
          </NotificationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
