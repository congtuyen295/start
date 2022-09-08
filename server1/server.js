require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");

const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true
  })
);
//connect to mongodb
require("./helpers/init_mongoose");

app.use("/api/auth", require("./routes/userRouter"));
app.use("/api/", require("./routes/uploadRouter"));
app.use("/api/", require("./routes/categoryRouter"));
app.use("/api/", require("./routes/productRouter"));
app.use("/api/", require("./routes/commentRouter"));
app.use("/api/", require("./routes/orderRouter"));
let users = [];
let usersChat = [];
const addUser = (userId, socketId) => {
  !usersChat.some((user) => user.userId === userId) &&
    usersChat.push({ userId, socketId });
};

const removeUser = (socketId) => {
  usersChat = usersChat.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return usersChat.find((user) => user.userId === userId);
};
const http = require("http").createServer(app);
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  //chat realtime
  socket.on("addUser", (userId) => {
    console.log(userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    if (senderId !== "admin") {
      io.emit("toAdmin", {
        senderId,
        text,
      });
    } else {
      const user = getUser(receiverId);
      console.log(user);
      console.log(usersChat);
      io.to(user?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(socket.id + "disconnected");
  });
});

app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/", (req, res) => {
  res.json({ msg: "Hello everyone!" });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log("server runing on port", PORT);
});
