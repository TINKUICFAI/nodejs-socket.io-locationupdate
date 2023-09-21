const express = require("express");
require("dotenv").config();
const http = require("http");
const PORT = process.env.PORT || 9110;
const app = express();
const server = http.createServer(app);
const events = require("events");
const { Server } = require("socket.io");
const { ExpressPeerServer } = require("peer");
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const UserService = require("./src/services/UserService");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const peer = ExpressPeerServer(server, {
  debug: true,
});

app.set("view engine", "ejs");
app.use("/peerjs", peer);
app.use(express.static("public"));

const eventEmitter = new events.EventEmitter();

setInterval(() => {
  eventEmitter.emit("updatelocation");
}, 5000);

app.get("/:room", (req, res) => {
  res.render("index", { RoomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("newUser", (id, room) => {
    socket.join(room);
    socket.to(room).emit("userJoined", id);
    eventEmitter.on("updatelocation", () => {
      socket.broadcast.emit("updateLocation", (data) => {
        let latitude = 28 + Math.random();
        let longitude = 72 + Math.random();

        if (data) {
          latitude = data.latitude;
          longitude = data.longitude;
        }

        let userId = "650ba0c07e41bb119887a3e3"; //i'm setting a fix value for testing

        if (socket.request.user) {
          userId = socket.request.user._id; // Assuming you have a user session}
        }

        UserService().updateProfile(userId, { latitude, longitude });
      });
    });
    socket.on("disconnect", () => {
      socket.to(room).emit("userDisconnect", id);
    });
  });
});

app.use("/v1/api", require("./src/routes"));

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
