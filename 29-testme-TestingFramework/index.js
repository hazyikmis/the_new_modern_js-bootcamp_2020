#!/usr/bin/env node
//the above line required for this file/app could be run as a CLI tool
//name of the app is tme (testme) --> check "package.json"

const Runner = require("./runner");
const runner = new Runner(); //new instance of Runner()

const run = async () => {
  // const results = await runner.collectFiles(process.cwd()); //what directory in the app called from
  // console.log(results);
  await runner.collectFiles(process.cwd()); //what directory in the app called from
  //console.log(runner.testFiles);
  runner.runTests();
};

run();
