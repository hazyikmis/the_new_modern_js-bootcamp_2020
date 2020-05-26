#!/usr/bin/env node

const fs = require("fs");
//const util = require("util"); //for Option #2.2
const chalk = require("chalk");
const path = require("path");

//look below for Option #2.1 (SELF-PROMISIFY)
/*
const lstat = filename => {
  return new Promise((resolve, reject) => {
    fs.lstat(filename, (err, stats) => {
      if (err) {
        reject(err);
      }
      resolve(stats);
    });
  });
};
*/
//const lstat = util.promisify(fs.lstat); //for Option #2.2 (by using UTIL pack)
const { lstat } = fs.promises; //for Option #2.3 (by using FS)
//const lstat = fs.promises.lstat; //also possible for Option #2.3 (by using FS)

//for accepting command-line parameters -BEGIN
//console.log(process.argv);
const targetDir = process.argv[2] || process.cwd();
//for accepting command-line parameters -END

//fs.readdir(".", (err, filenames) => {
//fs.readdir(process.cwd(), (err, filenames) => { //for Option #0 & #1
//fs.readdir(process.cwd(), async (err, filenames) => { //for Option #2 & Option #3
fs.readdir(targetDir, async (err, filenames) => {
  //for Option #2 & #3 also
  if (err) {
    console.log(err);
    //throw new Error(err);
  }

  //console.log(filenames);

  //OPTION #0
  //BAD CODE HERE!!! - START
  //BAD because, each call order of files/dirs are different
  //SO, DO NOT directly call/send "console.log" without invoking all cycles
  /*
  for (let filename of filenames) {
    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }
      console.log(filename, stats.isFile());
    });
  }
  */
  //BAD CODE HERE!!! - END

  //OPTION #1
  //BETTER CODE (BUT NOT IDEAL) - START
  /*
  const allStats = Array(filenames.length).fill(null);
  for (let filename of filenames) {
    const index = filenames.indexOf(filename);
    fs.lstat(filename, (err, stats) => {
      if (err) {
        console.log(err);
      }
      allStats[index] = stats;

      const ready = allStats.every(stats => {
        return stats;
      });

      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(filenames[index], stats.isFile());
        });
      }
    });
  }
  */
  //BETTER CODE (BUT NOT IDEAL) - END

  //OPTION #2
  //In this option, we have 3 different ways of creating promises, select one from the above (Option #2.1, #2.2 & #2.3)
  //Serial run of all promises
  //A FAR BETTER CODE (BUT STILL NOT IDEAL) - START
  /*
  for (let filename of filenames) {
    try {
      const stats = await lstat(filename);
      console.log(filename, stats.isFile());
    } catch (err) {
      console.log(err);
    }
  }
  */
  //A FAR BETTER CODE (BUT STILL NOT IDEAL) - END

  //OPTION #3
  //In this option, we are using the same ways of creating promises as in the Option #2, select one from the above (Option #2.1, #2.2 & #2.3)
  //Parallel run of all promises
  //BEST CODE - START
  const statPromises = filenames.map(filename => {
    //return lstat(filename);
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);
    //console.log(filenames[index], stats.isFile());
    //colorize with chalk npm pack
    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.bold(filenames[index]));
    }
  }
  //BEST CODE - END
});

//you can go up one or more directory and run "node list/index.js" or "node 26-NodeJS-CommandLineTools/list/index.js"
//then you'll see the list of folders/files on the screen...

//"npm init -y" //(in order to add package.json without asking any info)

//chmod +x index.js
//add "#!/usr..." line at the beginning of JS files to enable/let node can run it directly (treated as an executable file)

//"npm link" //to make our project accessible from everywhere in our machine
