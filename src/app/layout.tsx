import { PolicyEngineShell } from "@policyengine/ui-kit/layout";
import "@policyengine/ui-kit/styles.css";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PolicyEngine April Fools 2026",
  description: "Definitely real announcements from PolicyEngine",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <PolicyEngineShell country="us">{children}        </PolicyEngineShell>
      </body>
    </html>
  );
}
