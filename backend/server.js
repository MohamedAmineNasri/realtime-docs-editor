require("dotenv").config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");

const connectDB = require("./utils/db");
const Document = require("./models/document.model");

// ✅ Connect to MongoDB
connectDB();

// ✅ Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// ✅ Setup HTTP route for "/"
app.get("/", (req, res) => {
  res.send("✅ Hello from backend!");
});

// ✅ Start server and socket.io on same port
const PORT = 3001;
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "https://realtime-docs-editor.vercel.app"],
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.io running at http://localhost:${PORT}`);
});

// ✅ Socket.io logic
io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", {
      data: document.data,
      title: document.title,
    });

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async ({ data, title }) => {
      await Document.findByIdAndUpdate(documentId, { data, title });
    });

    socket.on("update-title", async (newTitle) => {
      await Document.findByIdAndUpdate(documentId, { title: newTitle });
      socket.broadcast.to(documentId).emit("receive-title", newTitle);
    });
  });
});

async function findOrCreateDocument(id) {
  if (!id) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({
    _id: id,
    data: "",
    title: "Untitled Document",
  });
}
