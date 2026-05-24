import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify/unstyled";

export const metadata: Metadata = {
  title: "GradeTrack",
  description: "Equipment grading, tasklist, and recap workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <NextTopLoader showSpinner={false} />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
