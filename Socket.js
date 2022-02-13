const express = require("express");
const app = require("./index");
// const passport = require('passport');
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const MESSAGE = require("./Schema/MESSAGE");
io.on("connection", (socket) => {
  socket.on("connection", () => {
    console.log("connection reveived");
  });
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("OneToOneChat", async (data) => {
    console.log(data, "one to one chat");
    try {
      const { firstPerson, secondPerson, message, messageId } = data;
      if (messageId == undefined || messageId == null) {
        console.log("if one to one chat");

        const createChat = new MESSAGE({
          user_one: firstPerson,
          user_two: secondPerson,
          message,
        });
        // io.sockets.in("61f79790a1ca9046998104c6").emit("messageFromOne", {
        //   message: message,
        // });
        socket.join(createChat._id);
        io.sockets.in(createChat._id).emit("messageFromOne", {
          message: message,
          isPrevChat: false,
        });
        await createChat.save();
        await USER.findByIdAndUpdate(
          firstPerson,
          {
            $push: {
              chat: { secondPerson: secondPerson, message: createChat._id },
            },
          },
          { new: true }
        );

        await USER.findByIdAndUpdate(
          secondPerson,
          {
            $push: {
              chat: { secondPerson: firstPerson, message: createChat._id },
            },
          },
          { new: true }
        );
      } else {
        console.log("else one to one chata");
        // socket.join("61f79790a1ca9046998104c6");
        socket.join(messageId);
        const modal = await MESSAGE.findByIdAndUpdate(
          messageId,
          {
            $push: {
              message: data.message,
            },
          },
          { new: true }
        );
        // const modal = await MESSAGE.findByIdAndUpdate(
        //   "61f79790a1ca9046998104c6",
        //   {
        //     $push: {
        //       message: data.message,
        //     },
        //   }
        //   // { new: true },
        // );
        console.log(modal, "<<<<");
        // const checkMsg = await MESSAGE.findByIdAndUpdate(
        //   "61f79790a1ca9046998104c6",
        //   {
        //     // $push: { message },
        //     $push: { message: "hello" },
        //   },
        //   { new: true }
        // );
        // console.log(checkMsg, "<<<check message");
        // io.sockets.in(messageId).emit("messageFromOne", {
        io.sockets.in(messageId).emit("messageFromOne", {
          message: { ...data },
        });
        // io.sockets.in("61f79790a1ca9046998104c6").emit("messageFromOne", {
        //   message: { ...data },
        // });
      }
    } catch (e) {
      console.log(e);
    }
  });
  socket.on("getPrivatePreviousChat", async (data) => {
    console.log("Get Previous message");
    // const messages = await MESSAGE.findById(data.messageId);
    const messages = await MESSAGE.findById("61f79790a1ca9046998104c6");
    // socket.join(messageId);
    socket.join("61f79790a1ca9046998104c6");
    // io.sockets.in(messageId).emit("initialMessage", messages);
    io.sockets.in("61f79790a1ca9046998104c6").emit("initialMessage", messages);
  });
});

server.listen(process.env.PORT || 5001, () => {
  console.log("Port is running on 5001");
});
