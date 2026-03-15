import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "日本語対応のダイビングショップ - 日本語対応のショップを探す",
  description:
    "国内・海外の日本語対応ダイビングショップを検索・比較できるサービスです。沖縄・伊豆から東南アジア・太平洋まで。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <Header />
        <main>{children}</main>
        <footer className="bg-ocean-900 text-ocean-200 text-sm text-center py-6 mt-16">
          <p>© 2025 日本語対応のダイビングショップ</p>
          <p className="mt-1 text-ocean-400 text-xs">
            掲載ショップの情報はショップ自身による登録内容です
          </p>
        </footer>
      </body>
    </html>
  );
}
