const express = require('express');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require('http');
const socketIo = require('socket.io');

require("dotenv").config();

const { socketObject } = require("./src/controller")

const userRoutes = require("./src/routes");
const { init } = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger("dev"));
app.use(cookieParser());

app.use('/', userRoutes);

init();

const server = http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`user-service is running on port ${PORT}`);
});

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("connecting to message service");
  if(socketObject.isLogin){
    io.emit("user-login", { message:`${socketObject.email} successfully logged in`})
  };
  if(socketObject.isSignup){
    io.emit("user-signup", { message:`${socketObject.email} successfully signed up`})
  };
});

module.exports = { server }

