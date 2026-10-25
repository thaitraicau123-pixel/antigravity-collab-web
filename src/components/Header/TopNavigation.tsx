"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Copy,
  Check,
  Share2,
  Download,
  Users,
  ChevronDown,
  Wifi,
  WifiOff,
  Sparkles,
} from "lucide-react";
import { SupportedLanguage, SUPPORTED_LANGUAGES, Peer } from "@/types/collaboration";

interface TopNavigationProps {
  roomId: string;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  code: string;
  isConnected: boolean;
  peers: Peer[];
  currentUser: Peer | null;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function TopNavigation({
  roomId,
  language,
  onLanguageChange,
  code,
  isConnected,
  peers,
  currentUser,
  isSidebarOpen,
  onToggleSidebar,
}: TopNavigationProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === language) || SUPPORTED_LANGUAGES[0];

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${roomId}${currentLangObj.extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-14 bg-[#111827] border-b border-slate-800 px-4 flex items-center justify-between select-none z-30">
      {/* Left: Brand & Room Info */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 group text-white hover:text-blue-400 transition-colors"
          title="Trở về sảnh chờ"
        >
          <div className="p-1.5 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm tracking-tight hidden sm:inline">
            Code<span className="text-blue-500">-Collab</span>
          </span>
        </Link>

        <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

        {/* Room Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-500 hidden md:inline">Phòng:</span>
          <span className="font-mono font-medium text-slate-200">{roomId}</span>
          <button
            onClick={handleCopyLink}
            className="p-1 hover:text-blue-400 text-slate-400 transition-colors"
            title="Sao chép link mời phòng"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Connection Status Indicator */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
            isConnected
              ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-400"
              : "bg-rose-950/40 border-rose-800/60 text-rose-400"
          }`}
        >
          {isConnected ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Đã kết nối</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden lg:inline">Đang nối lại...</span>
            </>
          )}
        </div>
      </div>

      {/* Middle: Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>{currentLangObj.label}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {isLangMenuOpen && (
          <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-44 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50">
            <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-slate-500">
              Chọn ngôn ngữ
            </div>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  onLanguageChange(lang.id);
                  setIsLangMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                  language === lang.id ? "text-blue-400 font-semibold bg-blue-500/10" : "text-slate-300"
                }`}
              >
                <span>{lang.label}</span>
                <span className="text-[10px] font-mono text-slate-500">{lang.extension}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Actions & User Avatars */}
      <div className="flex items-center gap-2">
        {/* Copy Code Button */}
        <button
          onClick={handleCopyCode}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
          title="Sao chép toàn bộ code"
        >
          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedCode ? "Đã chép!" : "Chép Code"}</span>
        </button>

        {/* Download File Button */}
        <button
          onClick={handleDownload}
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="Tải tệp mã nguồn về máy"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-600/20 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{copiedLink ? "Đã chép link!" : "Chia Sẻ"}</span>
        </button>

        {/* Toggle Sidebar Button */}
        <button
          onClick={onToggleSidebar}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            isSidebarOpen
              ? "bg-slate-800 border-slate-700 text-blue-400"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
          title="Bật/tắt danh sách thành viên"
        >
          <Users className="w-4 h-4" />
          <span className="font-semibold">{peers.length}</span>
        </button>
      </div>
    </header>
  );
}
