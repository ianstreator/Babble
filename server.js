const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const axios = require("axios");
const { Translate } = require("@google-cloud/translate");
const routes = require("./router.js");

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));
// routes.forEach((route) => {
//   app.get(`/${route}`, (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
//   });
// });
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`);
});

// const translate = new Translate();

// const text = "good morning Luci, I hope you slept well.";
// const target = "es";

// async function translateText() {
//   // Translates the text into the target language. "text" can be a string for
//   // translating a single piece of text, or an array of strings for translating
//   // multiple texts.
//   let [translations] = await translate.translate(text, target);
//   translations = Array.isArray(translations) ? translations : [translations];
//   console.log("Translations:");
//   translations.forEach((translation, i) => {
//     console.log(`${text[i]} => (${target}) ${translation}`);
//   });
// }

// translateText();
// async function translateText() {
//   const googleTrans = await axios.post(
//     `https://translation.googleapis.com/language/translate/v2`
//   );
// }

class Room {
  constructor(host, capacity, users) {
    (this.host = host), (this.capacity = capacity), (this.users = users);
  }
}
function genRoomID() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4();
}
const rooms = {};

function createRoom(host, language, capacity, socket, roomID) {
  const room = new Room(host, capacity, {});
  room.users[host] = language;
  socket.join(roomID);
  rooms[roomID] = room;
  socket.emit("invite id", roomID);
}
function joinRoom(guest, language, roomID, socket) {
  const room = rooms[roomID];
  if (!rooms[roomID]) return;
  const numOfUsers = Object.keys(room.users).length;
  if (room && numOfUsers <= room.capacity) {
    socket.join(roomID);
    room.users[guest] = language;
  }
}

io.on("connection", (socket) => {
  const { username, language, capacity, roomID, role } = socket.handshake.query;
  const RoomID = roomID || genRoomID();
  role === "host"
    ? createRoom(username, language, capacity, socket, RoomID)
    : joinRoom(username, language, roomID, socket);
  console.log(rooms);
  rooms[RoomID] &&
  rooms[RoomID].capacity >= Object.keys(rooms[RoomID].users).length
    ? socket.emit("validate", true)
    : socket.emit("validate", false);
  if (rooms[RoomID]) {
    let users = Object.keys(rooms[RoomID].users);
    setTimeout(() => {
      io.to(RoomID).emit("joined", [RoomID, users]);
    }, 50);

    socket.on("sender", (data) => {
      io.to(RoomID).emit("reciever", [data, socket.id]);
    });

    socket.on("disconnect", (data) => {
      if (data) {
        delete rooms[RoomID].users[username];
        const users = Object.keys(rooms[RoomID].users);
        if (rooms[RoomID].host === username) {
          rooms[RoomID].host = users[0];
        }
        console.log(rooms[RoomID]);
        io.to(RoomID).emit("user-leaving", [username, users]);
      }
    });
  }
});
