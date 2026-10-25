const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const PEER_COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#14B8A6", // Teal
  "#F97316", // Orange
];

// Room state storage: roomId -> { code, language, peers: Map<socketId, { id, name, color, cursor }> }
const rooms = new Map();

function getRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      code: `// Chào mừng đến với phòng Code-Collab!\n// Hãy chia sẻ mã phòng hoặc đường dẫn URL để cùng cộng tác viết code trực tiếp.\n\nfunction calculateSum(a, b) {\n  return a + b;\n}\n\nconsole.log("Tổng:", calculateSum(10, 20));\n`,
      language: "javascript",
      peers: new Map(),
    });
  }
  return rooms.get(roomId);
}

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Lỗi khi xử lý request HTTP:", err);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    let currentRoomId = null;
    let currentUser = null;

    socket.on("join-room", ({ roomId, userName }) => {
      currentRoomId = roomId;
      socket.join(roomId);

      const room = getRoom(roomId);
      const assignedColor = PEER_COLORS[room.peers.size % PEER_COLORS.length];

      currentUser = {
        id: socket.id,
        name: userName || `Dev-${socket.id.slice(0, 4)}`,
        color: assignedColor,
        cursor: { lineNumber: 1, column: 1 },
      };

      room.peers.set(socket.id, currentUser);

      // Gửi toàn bộ dữ liệu phòng hiện tại cho người mới vào
      socket.emit("room-init", {
        code: room.code,
        language: room.language,
        currentUser,
        peers: Array.from(room.peers.values()),
      });

      // Thông báo cho các thành viên khác trong phòng về sự có mặt của người mới
      socket.to(roomId).emit("peer-joined", currentUser);
      io.to(roomId).emit("peers-update", Array.from(room.peers.values()));

      console.log(`[Socket] User ${currentUser.name} (${socket.id}) đã tham gia phòng: ${roomId}`);
    });

    socket.on("code-change", ({ roomId, code }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.code = code;
        socket.to(roomId).emit("code-update", { code, senderId: socket.id });
      }
    });

    socket.on("cursor-move", ({ roomId, cursor }) => {
      const room = rooms.get(roomId);
      if (room && currentUser) {
        currentUser.cursor = cursor;
        socket.to(roomId).emit("cursor-update", {
          userId: socket.id,
          cursor,
        });
      }
    });

    socket.on("language-change", ({ roomId, language }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.language = language;
        io.to(roomId).emit("language-update", language);
      }
    });

    socket.on("disconnect", () => {
      if (currentRoomId && rooms.has(currentRoomId)) {
        const room = rooms.get(currentRoomId);
        room.peers.delete(socket.id);

        socket.to(currentRoomId).emit("peer-left", socket.id);
        io.to(currentRoomId).emit("peers-update", Array.from(room.peers.values()));

        console.log(`[Socket] User ${socket.id} đã rời khỏi phòng: ${currentRoomId}`);

        if (room.peers.size === 0) {
          // Lưu lại trong bộ nhớ tạm, dọn dẹp sau 30 phút nếu cần
        }
      }
    });
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Code-Collab Server sẵn sàng tại http://${hostname}:${port}`);
  });
});
