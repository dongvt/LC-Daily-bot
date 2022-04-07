"use strict";
const PORT = process.env.PORT || 3000;
const express = require('express');

const server = express();

server.all("/",(req,res) => {
  res.send("server running");
});

const keepAlive = () => {
  server.listen(PORT, () => {
    console.log("server ready");
  })
}

module.exports = keepAlive;