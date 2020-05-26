#!/usr/bin/env node
//chmod +x index.js  //for linux env
//npm link

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const program = require("caporal");
//we gave the name "program" because, this constant represents the program we are trying to build
//In chokidar's case, the "const chokidar" represents the npm pack
const fs = require("fs");
const { spawn } = require("child_process");
const chalk = require("chalk");

program
  .version("0.0.1")
  .argument("[filename]", "Name of the file to execute")
  //.action(args => {
  //  const filename = args.filename;
  .action(async ({ filename }) => {
    const name = filename || "index.js";

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file "${name}" !`);
    }

    let proc;
    const start = debounce(() => {
      //console.log("STARTING USERS PROGRAM");
      if (proc) {
        proc.kill();
      }
      console.log(chalk.blue(">>> Starting process..."));
      proc = spawn("node", [name], { stdio: "inherit" });
    }, 100);

    chokidar
      .watch(".")
      //.on("add", () => console.log("FILE ADDED"))
      //.on("add", () => console.log("STARTING USERS PROGRAM"))
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);

// const start = () => {
//   console.log("STARTING...")
// };

//chokidar.watch(".").on("all", () => {});
