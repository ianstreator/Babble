const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const routes = require("./router.js");

const app = express();
const server = http.createServer(app);

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));
routes.forEach((route) => {
  app.get(`/${route}`, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
});
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

const PORT = process.env.PORT || 4000;
server.listen(PORT, console.log(`server listening on port:${PORT}`));

const io = socketio(server, { cors: { origin: '*' } });

class Room {
  constructor(host, capacity, guests, languages) {}
}
const rooms = {};
io.on("connection", (socket) => {
  console.log("new user", socket.id);
  socket.on("message-send", (data) => {
    console.log(data);
  });
  const messageSpam = [];

  socket.on("sender", (data) => {
    console.log(data, socket.id);
    if (!messageSpam) {
      io.emit("reciever", [data, socket.id]);
    }
  });
});
