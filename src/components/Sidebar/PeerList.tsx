"use client";

import React, { useState } from "react";
import { Users, User, Copy, Check, Radio, Terminal, Sparkles } from "lucide-react";
import { Peer } from "@/types/collaboration";

interface PeerListProps {
  peers: Peer[];
  currentUser: Peer | null;
  roomId: string;
}

export function PeerList({ peers, currentUser, roomId }: PeerListProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col h-full select-none">
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-xs tracking-wide text-slate-200">
            Thành Viên Trực Tuyến
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-bold">
          {peers.length}
        </span>
      </div>

      {/* Peers List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {peers.map((peer) => {
          const isMe = peer.id === currentUser?.id;
          return (
            <div
              key={peer.id}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all ${
                isMe
                  ? "bg-slate-800/80 border-slate-700/80 shadow-sm"
                  : "bg-slate-900/50 border-slate-800/60 hover:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-inner shrink-0"
                  style={{ backgroundColor: peer.color || "#3B82F6" }}
                >
                  {peer.name.slice(0, 1).toUpperCase()}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-slate-200 truncate">
                      {peer.name}
                    </span>
                    {isMe && (
                      <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-1 rounded">
                        Bạn
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Dòng {peer.cursor?.lineNumber || 1}, Cột {peer.cursor?.column || 1}
                  </div>
                </div>
              </div>

              <span
                className="w-2 h-2 rounded-full shrink-0 shadow-sm"
                style={{ backgroundColor: peer.color || "#10B981" }}
                title={`Đang hoạt động tại dòng ${peer.cursor?.lineNumber || 1}`}
              />
            </div>
          );
        })}
      </div>

      {/* Room Quick Share Box at Bottom */}
      <div className="p-3 border-t border-slate-800 bg-[#0B0F19]">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-medium">Mã phòng:</span>
            <button
              onClick={handleCopyRoomId}
              className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Đã chép" : "Chép mã"}</span>
            </button>
          </div>
          <div className="font-mono text-xs text-slate-200 bg-slate-950 p-1.5 rounded-lg border border-slate-800/60 truncate">
            {roomId}
          </div>
          <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
            Gửi mã này hoặc URL cho bạn bè để cùng code song song trên cùng một màn hình.
          </p>
        </div>
      </div>
    </aside>
  );
}
