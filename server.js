const express = require("express");
const path = require("path");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
})



const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`server listening on port:${PORT}`))

