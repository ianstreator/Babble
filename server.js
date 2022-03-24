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
  constructor(host, capacity, users, languages, roomID) {
    (this.host = host),
      (this.capacity = capacity),
      (this.users = users),
      (this.languages = languages),
      (this.roomID = roomID);
  }
}
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4();
}
const rooms = {};

function createRoom(host, language, capacity) {
  const room = new Room(host, capacity, [host], [language]);
  rooms[guidGenerator()] = room;
}
function joinRoom(guest, language, roomID, socket) {
  const room = rooms[roomID];
  console.log(socket)
  if (room && room.users.length - 1 < room.capacity) {
    if (room.languages.find((e) => e !== language)) {
      room.languages.push(language);
    }
    room.users.push(guest);
    socket.emit("validate", true);
  } else {
    socket.emit("validate", false);
  }
}

io.on("connection", (socket) => {
  const { username, language, capacity, roomID, role } = socket.handshake.query;
  console.log(rooms);
  role === "host"
    ? createRoom(username, language, capacity)
    : joinRoom(username, language, roomID, socket);
  console.log(rooms);
  socket.emit("validate", false)
  socket.on("message-send", (data) => {
    console.log(data);
  });
  socket.on("sender", (data) => {
    console.log(data, socket.id);
    io.emit("reciever", [data, socket.id]);
  });
});
