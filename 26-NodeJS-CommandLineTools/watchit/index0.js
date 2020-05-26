#!/usr/bin/env node

//chmod +x index.js  //for linux env
//npm link

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
// const start = () => {
//   console.log("STARTING...")
// };

//wrap the start function above with debounce()
const start = debounce(() => {
  console.log("STARTING USERS PROGRAM");
}, 100);

chokidar
  .watch(".")
  //.on("add", () => console.log("FILE ADDED"))
  //.on("add", () => console.log("STARTING USERS PROGRAM"))
  .on("add", start)
  .on("change", () => console.log("FILE CHANGED"))
  .on("unlink", () => console.log("FILE DELETED"));

//chokidar.watch(".").on("all", () => {});
