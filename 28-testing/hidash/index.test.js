const { forEach, map } = require("./index");

let sum = 0;
forEach([1, 2, 3], value => {
  sum += value;
});
//console.log(sum);

if (sum !== 6) {
  throw new Error("Expected summing array to equal 6!");
}

const result = map([1, 2, 3], value => {
  return value * 2;
});
//result === [2, 4, 6]

if (result[0] !== 2) {
  throw new Error("Expected to find 4, but not found!");
}
if (result[1] !== 4) {
  throw new Error("Expected to find 8, but not found!");
}
if (result[2] !== 6) {
  throw new Error("Expected to find 12, but not found!");
}

//3 BIG ISSUES:
//1.We cannot know which test is running. We need to put console.log("test description") befaore each test
//2.We cannot use same varible names again and again "const result = ..."
//3.If any errors happens then teh execution of tests breaks
//In order to solve all these 3 issues, please check "index.better.test.js"
