"use strict";
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || process.env.MONGODB_LOCAL;

const express = require('express');
const server = express();

const mongoose = require('mongoose');
const mongoOptions = {
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // family: 4
};

server.all("/",(req,res) => {
  res.send("server running");
});

const keepAlive = () => {
  mongoose.connect(MONGODB_URL,mongoOptions)
  .then(result => {
      server.listen(PORT, () => {
        console.log("server ready");
      });
  });
};

module.exports = keepAlive;