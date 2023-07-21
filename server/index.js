// 配置全局相对路径
global.basename = __dirname;

const express = require('express');

// 导入全局配置文件
global.CONFIG = require(`${basename}/config/config.js`);

const cors = require('cors');

const mongoose = require('mongoose');

const userRoutes = require(`${basename}/routes/userRoutes`);

const messagesRoutes = require(`${basename}/routes/messagesRoutes`);

const socket = require('socket.io');

const app = express();

require('dotenv').config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", userRoutes);

app.use("/api/messages", messagesRoutes);

mongoose.connect(CONFIG.DB_OPTIONS.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB数据库,连接成功');
}).catch(err => {
  console.log('err.message ==> ', err.message);
});

const server = app.listen(CONFIG.SERVER_OPTIONS.POST, () => {
  console.log(`Server runing... 端口为：${CONFIG.SERVER_OPTIONS.POST}`);
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  })

  socket.on("send-msg", (data) => {
    // console.log('data ==> ', data);
    const sendUserSocket = onlineUsers.get(data.to);
    // console.log('sendUserSocket ==> ', sendUserSocket);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message)
    }
  })
});