const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const routes = require("./router.js");

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));
routes.forEach((route) => {
  app.get(`/${route}`, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`);
});

class Room {
  constructor(host, capacity, guests, languages) {}
}
const rooms = {};

io.set('origins', '*:*');
io.on("connection", (socket) => {
  console.log("new user", socket.id);
  socket.on("message-send", (data) => {
    console.log(data);
  });
  socket.on("sender", (data) => {
    console.log(data, socket.id);
    io.emit("reciever", [data, socket.id]);
  });
});
