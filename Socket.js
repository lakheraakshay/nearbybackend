const express = require("express");
const app = require("./index");
// const passport = require('passport');
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("connection", () => {
    console.log("connection reveived");
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("OneToOneChat", async (data) => {
    try {
      if (data.messageId == undefined || data.messageId == null) {
      } else {
        socket.join(messageId);
        await MESSAGE.findByIdAndUpdate(
          messageId,
          {
            $push: { message },
          },
          { new: true }
        );
        io.sockets.in(messageId).emit("messageFromOne", {
          message: { ...data },
        });
      }
      socket.on("getPrivatePreviousChat", async (data) => {
        const messages = await MESSAGE.findById(data.messageId);
        socket.join(messageId);
        io.sockets.in(messageId).emit("initialMessage", messages);
      });
    } catch (e) {
      console.log(e);
    }
  });
});

app.listen(process.env.PORT || 5001, () => {
  console.log("Port is running on 5000");
});
