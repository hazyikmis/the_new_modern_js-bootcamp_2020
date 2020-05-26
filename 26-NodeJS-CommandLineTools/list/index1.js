#!/usr/bin/env node

const fs = require("fs");

//fs.readdir(".", (err, filenames) => {
fs.readdir(process.cwd(), (err, filenames) => {
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
  //BETTER CODE (BUT NOT IDEAL) - END

  //OPTION #2
  //A FAR BETTER CODE (BUT NOT STILL IDEAL) - START
  //...implemented on index2.js
  //A FAR BETTER CODE (BUT NOT STILL IDEAL) - END
});

//you can go up one or more directory and run "node list/index.js" or "node 26-NodeJS-CommandLineTools/list/index.js"
//then you'll see the list of folders/files on the screen...

//"npm init -y" //(in order to add package.json without asking any info)

//chmod +x index.js
//add "#!/usr..." line at the beginning of JS files to enable/let node can run it directly (treated as an executable file)

//"npm link" //to make our project accessible from everywhere in our machine
