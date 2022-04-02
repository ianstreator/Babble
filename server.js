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

// const languagesGet = async () => {
//   const [languages] = await translate.getLanguages();
//   console.log(languages);
// };
// languagesGet();
// const currentTime = Date;

// console.log(currentTime.now());

// app.get("/languages", async (req, res) => {
//   console.log("hello");

//   try {
//     const [languages] = await translate.getLanguages();
//     console.log(languages);
//     res.send(languages);
//   } catch (error) {
//     console.log(error);
//   }
// });

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
  const userNames = Object.keys(room.users);
  const numOfUsers = userNames.length;
  if (
    room &&
    numOfUsers <= room.capacity &&
    !userNames.some((n) => n === guest)
  ) {
    socket.join(roomID);
    socket.emit("validate", true);
    room.users[guest] = language;
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
        // if (language === "en") {
        //   socket.emit(
        //     "server spam alert",
        //     "2 seconds between messages please."
        //   );
        // } else {
        //   const transText = await translateText(
        //     "2 seconds between messages please.",
        //     language
        //   );
        //   socket.emit("server spam alert", `${transText}`);
        // }
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
      if (data) {
        const users = rooms[RoomID].users;
        console.log(username);
        console.log(users[`${username}`]);

        delete rooms[RoomID].users[username];
        console.log(users);
        console.log(users[username]);
        if (rooms[RoomID].host === username) {
          rooms[RoomID].host = users[0];
          console.log("host has left the room assigning new host..");
          if (!users[0]) {
            delete rooms[RoomID];
            console.log("last user has left the room, room has been removed..");
            return;
          }
        }
        const newUsers = Object.keys(rooms[RoomID].users);
        io.to(RoomID).emit("user-leaving", [username, newUsers]);
      }
    });
  }
});
