require("dotenv").config(); // Load .env variables
const mongoose = require("mongoose");
const connectDB = require("./utils/db"); // Adjust path if needed
const Document = require("./models/document.model");

// ✅ Connect to MongoDB using the reusable function
connectDB();

// Start Socket.io server on port 3001
const PORT = 3001;
const io = require("socket.io")(PORT, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

console.log(`🚀 Socket.io server running on port ${PORT}`);

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
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({
    _id: id,
    data: "",
    title: "Untitled Document",
  });
}
