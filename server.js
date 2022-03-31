require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const axios = require("axios");
const { Translate } = require("@google-cloud/translate").v2;
const routes = require("./router.js");

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));
app.enable("trust proxy");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`);
});

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});


async function translateText(text, target) {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log("Translations:");
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
  console.log(translations[0]);
  return translations[0];
}

function genRoomID() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4();
}
function createRoom(host, language, capacity, socket, roomID) {
  const room = new Room(host, capacity, {}, [language]);
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
    if (room.languages.some((l) => l === language)) {
      return;
    } else {
      room.languages.push(language);
    }
  }
}
class Room {
  constructor(host, capacity, users, languages) {
    (this.host = host),
      (this.capacity = capacity),
      (this.users = users),
      (this.languages = languages);
  }
}

const rooms = {};

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
    }, 200);

    socket.on("sender", (data) => {
      rooms[RoomID].languages.forEach(async (l) => {
        const transText = await translateText(data, l);
        io.to(RoomID).emit(`${l}`, [`${transText}`, socket.id]);
      });
    });

    socket.on("disconnect", (data) => {
      if (data) {
        delete rooms[RoomID].users[username];
        const users = Object.keys(rooms[RoomID].users);
        if (rooms[RoomID].host === username) {
          rooms[RoomID].host = users[0];
          console.log("host has left the room assigning new host..");
          if (!users[0]) {
            delete rooms[RoomID];
            console.log("last user has left the room, room has been removed..");
          }
        }
        io.to(RoomID).emit("user-leaving", [username, users]);
      }
    });
  }
});
