const express = require("express");
const app = require("../index");
// const passport = require('passport');
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("connection", () => {
    console.log("connection reveived");
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
    // socket.disconnect(chatId);
  });
  socket.on("OneToOneChat", async (data) => {
    try {
      if (data.message_id == undefined || data.message_id == null) {
      } else {
        socket.join(message_id);

        await MESSAGE.findByIdAndUpdate(
          message_id,
          {
            $push: { message },
          },
          { new: true }
        );

        io.sockets.in(message_id).emit("messageFromOne", {
          message: { ...data },
          chatId,
          socket: socket.id,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
});

app.listen(process.env.PORT || 5001, () => {
  console.log("Port is running on 5000");
});
