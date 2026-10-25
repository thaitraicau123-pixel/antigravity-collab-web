import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code-Collab — Trình Soạn Thảo Mã Nguồn Cộng Tác Trực Tuyến",
  description: "Cộng tác lập trình thời gian thực, đồng bộ con trỏ và cú pháp chuyên nghiệp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="bg-ide-bg text-slate-100 min-h-screen selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
