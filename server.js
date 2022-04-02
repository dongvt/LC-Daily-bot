"use strict";
const express = require('express');

const server = express();

server.all("/",(req,res) => {
  res.send("server running");
});

const keepAlive = () => {
  server.listen(3000, () => {
    console.log("server ready");
  })
}

module.exports = keepAlive;