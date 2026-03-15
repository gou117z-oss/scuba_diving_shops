"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-ocean-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🤿</span>
            <span className="text-xl font-bold tracking-tight">
              日本語対応のダイビングショップ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/shops" className="hover:text-ocean-300 transition-colors">
              ショップ一覧
            </Link>
            <Link href="/spots" className="hover:text-ocean-300 transition-colors">
              スポット一覧
            </Link>
            {/* <Link
              href="/register"
              className="bg-ocean-500 hover:bg-ocean-400 px-4 py-2 rounded-full transition-colors"
            >
              ショップ登録
            </Link> */}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ocean-900 px-4 py-3 space-y-2 text-sm">
          <Link
            href="/shops"
            className="block py-2 hover:text-ocean-300"
            onClick={() => setMenuOpen(false)}
          >
            ショップ一覧
          </Link>
          <Link
            href="/spots"
            className="block py-2 hover:text-ocean-300"
            onClick={() => setMenuOpen(false)}
          >
            スポット一覧
          </Link>
          {/* <Link
            href="/register"
            className="block py-2 hover:text-ocean-300"
            onClick={() => setMenuOpen(false)}
          >
            ショップ登録
          </Link> */}
        </div>
      )}
    </header>
  );
}
