const counterObject = require("./myscript.js");

console.log(counterObject.getCounter()); //0
counterObject.incrementCounter();
console.log(counterObject.getCounter()); //1

const newCounterObject = require("./myscript.js");
console.log(newCounterObject.getCounter()); //0 or 1 ???

//if we require the same js file 2nd or more times, all the objects exported from
//this file (as a module) in the first require used again and again from the REQUIRE_CACHE of the NODEJS
//So the result of  last console.log() => 1
//means that newCounterObject is not really "new", it is the same as counterObject

//As a result; we cannot run/execute required JS files more than once!

//RUN THIS APP BY TYPING "node index.js" on the console/terminal
//DEBUG THIS APP BY;
//--look at the Debug 1 & 2 & 3 jpegs
//hint 1:
//"node --inspect index.js" command starts your app and does not wait at the beginning, it continue to run until it hits a "debugger" statement.
//"node --inspect-brk index.js" command starts your app and waits at the beginning
//you can access the debugger by typing "chrome://inspect" onto the url/address
//hint 2:
//"node inspect index.js" is a very primitive way of using debugger at the terminal (without using chrome)
//in this method you need to use c, n, s, o keys (check Debug_2.jpg)
