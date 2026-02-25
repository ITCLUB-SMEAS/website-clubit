"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "16px",
          fontSize: "14px",
          fontWeight: 500,
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        },
      }}
    />
  );
}
