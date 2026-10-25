"use client";

import React, { useRef, useEffect, useState } from "react";
import Editor, { Monaco, OnMount } from "@monaco-editor/react";
import type { editor as MonacoEditorType } from "monaco-editor";
import { SupportedLanguage, CursorPosition, Peer } from "@/types/collaboration";

interface CollaborativeEditorProps {
  code: string;
  language: SupportedLanguage;
  onCodeChange: (code: string) => void;
  onCursorMove: (pos: CursorPosition) => void;
  remoteCursors: Map<string, { cursor: CursorPosition; peer: Peer }>;
  currentUser: Peer | null;
}

export function CollaborativeEditor({
  code,
  language,
  onCodeChange,
  onCursorMove,
  remoteCursors,
  currentUser,
}: CollaborativeEditorProps) {
  const editorRef = useRef<MonacoEditorType.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const decorationsRef = useRef<Map<string, string[]>>(new Map());
  const [currentPos, setCurrentPos] = useState<CursorPosition>({ lineNumber: 1, column: 1 });
  const [totalLines, setTotalLines] = useState(1);
  const isRemoteUpdatingRef = useRef(false);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Lắng nghe di chuyển con trỏ của người dùng hiện tại
    editor.onDidChangeCursorPosition((e) => {
      const pos = {
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      };
      setCurrentPos(pos);
      onCursorMove(pos);
    });

    // Cập nhật số dòng khi nội dung thay đổi
    editor.onDidChangeModelContent(() => {
      setTotalLines(editor.getModel()?.getLineCount() || 1);
    });

    setTotalLines(editor.getModel()?.getLineCount() || 1);
  };

  // Đồng bộ nội dung code từ WebSocket khi người khác gõ
  useEffect(() => {
    if (!editorRef.current) return;

    const editorValue = editorRef.current.getValue();
    if (code !== editorValue) {
      isRemoteUpdatingRef.current = true;
      const position = editorRef.current.getPosition();
      editorRef.current.setValue(code);
      if (position) {
        editorRef.current.setPosition(position);
      }
      isRemoteUpdatingRef.current = false;
    }
  }, [code]);

  // Cập nhật hiển thị con trỏ từ xa (Remote Cursors) của các bạn cùng phòng
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;
    const editor = editorRef.current;
    const monaco = monacoRef.current;

    remoteCursors.forEach(({ cursor, peer }, userId) => {
      if (userId === currentUser?.id) return;

      const styleId = `cursor-style-${userId}`;
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
          .remote-cursor-${userId} {
            border-left: 2px solid ${peer.color || "#3B82F6"};
            position: absolute;
            height: 100% !important;
            box-shadow: 0 0 6px ${peer.color || "#3B82F6"}88;
          }
          .remote-cursor-label-${userId}::after {
            content: "${peer.name}";
            background-color: ${peer.color || "#3B82F6"};
            color: #ffffff;
            font-size: 10px;
            font-family: ui-sans-serif, system-ui, sans-serif;
            font-weight: 600;
            padding: 1px 5px;
            border-radius: 4px;
            position: absolute;
            top: -18px;
            left: 0;
            white-space: nowrap;
            pointer-events: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.4);
            z-index: 10;
          }
        `;
        document.head.appendChild(style);
      }

      const newDecorations: MonacoEditorType.IModelDeltaDecoration[] = [
        {
          range: new monaco.Range(
            cursor.lineNumber,
            cursor.column,
            cursor.lineNumber,
            cursor.column
          ),
          options: {
            className: `remote-cursor-${userId} remote-cursor-label-${userId}`,
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          },
        },
      ];

      const oldDecorations = decorationsRef.current.get(userId) || [];
      const applied = editor.deltaDecorations(oldDecorations, newDecorations);
      decorationsRef.current.set(userId, applied);
    });

    // Dọn dẹp decorations của người đã thoát
    decorationsRef.current.forEach((oldDecos, userId) => {
      if (!remoteCursors.has(userId) && userId !== currentUser?.id) {
        editor.deltaDecorations(oldDecos, []);
        decorationsRef.current.delete(userId);
        const style = document.getElementById(`cursor-style-${userId}`);
        if (style) style.remove();
      }
    });
  }, [remoteCursors, currentUser]);

  const handleEditorChange = (value: string | undefined) => {
    if (isRemoteUpdatingRef.current) return;
    onCodeChange(value || "");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1E1E] overflow-hidden">
      {/* Main Monaco Workspace */}
      <div className="flex-1 w-full h-full relative">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
            fontLigatures: true,
            tabSize: 2,
            minimap: { enabled: true, side: "right" },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "all",
            lineNumbers: "on",
            bracketPairColorization: { enabled: true },
            padding: { top: 12, bottom: 12 },
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-[#1E1E1E] text-slate-400 text-sm">
              <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
              Đang khởi tạo Monaco Editor...
            </div>
          }
        />
      </div>

      {/* Editor Status Bar */}
      <div className="h-6 bg-[#007ACC] text-white text-[11px] px-3 flex items-center justify-between font-mono select-none z-20">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-sans font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Code-Collab Live
          </span>
          <span>
            Dòng {currentPos.lineNumber}, Cột {currentPos.column} ({totalLines} dòng)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Dấu cách: 2</span>
          <span>UTF-8</span>
          <span className="uppercase font-semibold tracking-wider">{language}</span>
        </div>
      </div>
    </div>
  );
}
