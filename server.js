require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
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
  console.log(`User : [${host}] *has created* Room : [${roomID}]`);
}
function joinRoom(guest, language, roomID, socket) {
  const room = rooms[roomID];
  const userNames = Object.keys(room.users);
  const numOfUsers = userNames.length;
  if (
    room &&
    numOfUsers < room.capacity &&
    !userNames.some((n) => n === guest)
  ) {
    socket.join(roomID);
    socket.emit("validate", true);
    room.users[guest] = language;
    console.log(`User : [${guest}] *has joined* Room : [${roomID}]`);
    if (room.languages.some((l) => l === language)) {
      return;
    } else {
      room.languages.push(language);
    }
  } else {
    return socket.emit("validate", false);
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

io.on("connection", async (socket) => {
  const { username, language, capacity, roomID, role } = socket.handshake.query;
  const RoomID = roomID || genRoomID();
  if (!rooms[RoomID] && role === "guest") return socket.emit("validate", false);
  (await role) === "host"
    ? createRoom(username, language, capacity, socket, RoomID)
    : joinRoom(username, language, roomID, socket);
  console.log(rooms);
  if (rooms[RoomID]) {
    let users = Object.keys(rooms[RoomID].users);
    setTimeout(() => {
      io.to(RoomID).emit("joined", [RoomID, users]);
    }, 200);

    const messageLimiter = [];
    socket.on("sender", async (data) => {
      let currentTime = Date.now();
      messageLimiter.unshift(currentTime);
      messageLimiter.splice(2, 1);
      if (messageLimiter[0] - messageLimiter[1] < 2000) {
        socket.emit("server spam alert", true);
        return;
      }
      rooms[RoomID].languages.forEach(async (l) => {
        if (language === l) {
          io.to(RoomID).emit(`${l}`, [data, socket.id]);
        } else {
          const transText = await translateText(data, l);
          io.to(RoomID).emit(`${l}`, [`${transText}`, socket.id]);
        }
      });
    });

    socket.on("disconnect", (data) => {
      const room = rooms[RoomID];
      const users = room.users;
      const langIndex = rooms[RoomID].languages.findIndex(
        (l) => l === language
      );
      delete rooms[RoomID].users[username];
      if (!Object.values(users).find((l) => l === language))
        rooms[RoomID].languages.splice(langIndex, 1);

      console.log(`User : [${username}] *has left* Room : [${roomID}]`);
      console.log(room);
      if (room.host === username) {
        if (!Object.keys(users)[0]) {
          delete rooms[RoomID];
          console.log(
            `all users are gone, Room : [${RoomID}] has been removed..`
          );
          return;
        }
        room.host = Object.keys(users)[0];
        console.log("host has left the room assigning new host..");
        console.log(room);
      }
      const newUsers = Object.keys(rooms[RoomID].users);
      io.to(RoomID).emit("user-leaving", [username, newUsers]);

    });
  }
});
