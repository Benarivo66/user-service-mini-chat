const express = require('express');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const http = require('http');

const socketIo = require('socket.io');

require("dotenv").config();

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
const io = socketIo(server);

const PORT = process.env.PORT;

io.on('connection', (socket) => {
  console.log('A user connected');

  io.emit('user-connected', { message: 'A user connected' });
});

server.listen(PORT, () => {
  console.log(`user-service is running on port ${PORT}`);
});
