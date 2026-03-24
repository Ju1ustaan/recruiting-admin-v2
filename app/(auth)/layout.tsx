import type { Metadata } from "next";
// import "./globals.css";

export const metadata: Metadata = {
  title: "Login page",
  description: "sign in to dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <div suppressHydrationWarning className="antialiased">
            {children}
      </div>
    </div>
  );
}