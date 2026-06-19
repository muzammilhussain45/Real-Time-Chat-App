import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const userSocketMap = {}
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}


io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;


  if (userId != undefined) {
    console.log(`User connected: ${userId}`);
    userSocketMap[userId] = socket.id;
  }
  io.emit("getonlineUsers", Object.keys(userSocketMap));
  socket.on('disconnect', () => {
   delete userSocketMap[userId];
    io.emit("getonlineUsers", Object.keys(userSocketMap));
     
  })
});


export { app, server, io };