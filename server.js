const express = require("express");
const path = require("path");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
const server = app.listen(
  PORT,
  console.log(`server listening on port:${PORT}`)
);

const io = require("socket.io")(server, { cors: { origin: "*" } });

class Room {
  constructor(host, capacity, guests, languages) {}
}
const rooms = {};
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
