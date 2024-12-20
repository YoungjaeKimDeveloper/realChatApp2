// Packages
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// Configurations
const app = express();
// app.use(express.static("../client/public"));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// socket.io
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
  socket.on("disconnect", () => {
    console.log("Client DisConnected");
  });
  // Server Side
});

app.get("/", (req, res) => {
  return res.json({ message: "Jello" });
});
// Run the server
httpServer.listen(3000, () => {
  console.log("SERVER IS RUNNING in 3000");
});
