"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Code2, Users, Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

export default function LobbyPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("code_collab_username");
    if (savedName) {
      setUserName(savedName);
    } else {
      const randomNames = ["Alex Dev", "Minh Coder", "Sarah Tech", "Lan Developer", "Dev Pro"];
      const picked = randomNames[Math.floor(Math.random() * randomNames.length)];
      setUserName(picked);
      localStorage.setItem("code_collab_username", picked);
    }
  }, []);

  const generateRoomId = () => {
    const prefixes = ["room", "code", "dev", "collab"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${randomNum}`;
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsSubmitting(true);
    localStorage.setItem("code_collab_username", userName.trim());
    const newRoom = generateRoomId();
    router.push(`/room/${newRoom}`);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !roomId.trim()) return;

    setIsSubmitting(true);
    localStorage.setItem("code_collab_username", userName.trim());
    const cleanRoomId = roomId.trim().toLowerCase().replace(/\s+/g, "-");
    router.push(`/room/${cleanRoomId}`);
  };

  return (
    <main className="min-h-screen bg-[#080D1A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Brand */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mb-8">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 mb-5 shadow-lg backdrop-blur">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
            Realtime Collaboration V1.0
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400 shadow-inner">
            <Code2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Code<span className="text-blue-500">-Collab</span>
          </h1>
        </div>

        <p className="text-slate-400 text-sm sm:text-base max-w-lg mt-2">
          Không gian lập trình cộng tác thời gian thực với Monaco Editor chuẩn VS Code,
          đồng bộ con trỏ và cú pháp đa ngôn ngữ tức thì.
        </p>
      </div>

      {/* Interactive Join / Create Card */}
      <div className="relative z-10 w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="space-y-5">
          {/* User Name Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Tên hiển thị của bạn
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Nhập tên của bạn (VD: Minh Dev)"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="border-t border-slate-800/80 pt-5">
            {/* Quick Create Room Button */}
            <button
              onClick={handleCreateRoom}
              disabled={isSubmitting || !userName.trim()}
              className="w-full group flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Tạo Phòng Mới Tức Thì</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-xs text-slate-500 uppercase tracking-widest font-semibold">
              Hoặc tham gia phòng
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          {/* Join by ID Form */}
          <form onSubmit={handleJoinRoom} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Mã phòng cần vào
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="VD: room-8291 hoặc code-alpha"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !userName.trim() || !roomId.trim()}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700/80 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Tham Gia Phòng Này</span>
            </button>
          </form>
        </div>

        {/* Feature Badges */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 flex flex-col items-center">
            <Zap className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[11px] text-slate-400">WebSocket</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 flex flex-col items-center">
            <Globe className="w-4 h-4 text-blue-400 mb-1" />
            <span className="text-[11px] text-slate-400">Đa Ngôn Ngữ</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[11px] text-slate-400">VS Code Core</span>
          </div>
        </div>
      </div>
    </main>
  );
}
