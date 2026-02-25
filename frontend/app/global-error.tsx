"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body style={{ margin: 0, backgroundColor: "#0f172a" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <h1 style={{ color: "#f8fafc", fontSize: "2rem", fontWeight: 900, marginBottom: "1rem" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
              A critical error occurred. Please try again.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#0ea5e9",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
