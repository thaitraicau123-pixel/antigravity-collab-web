"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { TopNavigation } from "@/components/Header/TopNavigation";
import { PeerList } from "@/components/Sidebar/PeerList";
import { CollaborativeEditor } from "@/components/Editor/CollaborativeEditor";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = (params.roomId as string) || "general";

  const [userName, setUserName] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let name = localStorage.getItem("code_collab_username");
    if (!name) {
      name = `Dev-${Math.floor(100 + Math.random() * 900)}`;
      localStorage.setItem("code_collab_username", name);
    }
    setUserName(name);
    setIsInitialized(true);
  }, []);

  const {
    isConnected,
    code,
    language,
    currentUser,
    peers,
    remoteCursors,
    broadcastCodeChange,
    broadcastCursorMove,
    broadcastLanguageChange,
  } = useSocket({
    roomId,
    userName: userName || "Anonymous",
  });

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-slate-400 text-sm">
        <span className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-3" />
        Đang chuẩn bị phòng làm việc...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0B0F19]">
      {/* Top Header Toolbar */}
      <TopNavigation
        roomId={roomId}
        language={language}
        onLanguageChange={broadcastLanguageChange}
        code={code}
        isConnected={isConnected}
        peers={peers}
        currentUser={currentUser}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Collapsible Sidebar */}
        {isSidebarOpen && (
          <PeerList
            peers={peers}
            currentUser={currentUser}
            roomId={roomId}
          />
        )}

        {/* Collaborative Monaco Editor */}
        <CollaborativeEditor
          code={code}
          language={language}
          onCodeChange={broadcastCodeChange}
          onCursorMove={broadcastCursorMove}
          remoteCursors={remoteCursors}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
