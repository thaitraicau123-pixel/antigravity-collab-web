"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Peer, SupportedLanguage, CursorPosition } from "@/types/collaboration";

interface UseSocketProps {
  roomId: string;
  userName: string;
}

export function useSocket({ roomId, userName }: UseSocketProps) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [currentUser, setCurrentUser] = useState<Peer | null>(null);
  const [peers, setPeers] = useState<Peer[]>([]);
  const [remoteCursors, setRemoteCursors] = useState<Map<string, { cursor: CursorPosition; peer: Peer }>>(new Map());

  // Kết nối và lắng nghe events từ Socket.io
  useEffect(() => {
    if (!roomId) return;

    const socket = io({
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join-room", { roomId, userName });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("room-init", (data) => {
      setCode(data.code);
      setLanguage(data.language as SupportedLanguage);
      setCurrentUser(data.currentUser);
      setPeers(data.peers);
    });

    socket.on("peers-update", (updatedPeers: Peer[]) => {
      setPeers(updatedPeers);
    });

    socket.on("code-update", ({ code: newCode, senderId }) => {
      if (senderId !== socket.id) {
        setCode(newCode);
      }
    });

    socket.on("language-update", (newLanguage: SupportedLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on("cursor-update", ({ userId, cursor }: { userId: string; cursor: CursorPosition }) => {
      setRemoteCursors((prev) => {
        const next = new Map(prev);
        const targetPeer = peers.find((p) => p.id === userId);
        if (targetPeer) {
          next.set(userId, { cursor, peer: targetPeer });
        }
        return next;
      });
    });

    socket.on("peer-left", (userId: string) => {
      setRemoteCursors((prev) => {
        const next = new Map(prev);
        next.delete(userId);
        return next;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, userName]);

  // Cập nhật peers reference trong remoteCursors khi peers thay đổi
  useEffect(() => {
    setRemoteCursors((prev) => {
      const next = new Map();
      prev.forEach((value, key) => {
        const peer = peers.find((p) => p.id === key);
        if (peer) {
          next.set(key, { ...value, peer });
        }
      });
      return next;
    });
  }, [peers]);

  // Hàm phát tán thay đổi code
  const broadcastCodeChange = useCallback(
    (newCode: string) => {
      setCode(newCode);
      if (socketRef.current?.connected) {
        socketRef.current.emit("code-change", { roomId, code: newCode });
      }
    },
    [roomId]
  );

  // Hàm phát tán di chuyển con trỏ
  const broadcastCursorMove = useCallback(
    (cursor: CursorPosition) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit("cursor-move", { roomId, cursor });
      }
    },
    [roomId]
  );

  // Hàm đổi ngôn ngữ lập trình
  const broadcastLanguageChange = useCallback(
    (newLanguage: SupportedLanguage) => {
      setLanguage(newLanguage);
      if (socketRef.current?.connected) {
        socketRef.current.emit("language-change", { roomId, language: newLanguage });
      }
    },
    [roomId]
  );

  return {
    socket: socketRef.current,
    isConnected,
    code,
    language,
    currentUser,
    peers,
    remoteCursors,
    broadcastCodeChange,
    broadcastCursorMove,
    broadcastLanguageChange,
  };
}
