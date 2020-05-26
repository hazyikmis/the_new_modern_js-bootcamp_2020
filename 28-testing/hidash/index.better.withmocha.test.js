//THE ONLY DIFFERENCE WITH "index.better.test.js" IS,
//NO NEED TO USE "test" function, WE HAVE COMMENTED IT OUT, BECAUSE globally installed "Mocha" library has its own test function, called "it"
//AND WE REPLACED "test" to "it"
///THATS ALL

const assert = require("assert").strict;
const { forEach, map } = require("./index");

// const test = (desc, fn) => {
//   console.log("---", desc);
//   try {
//     fn();
//   } catch (err) {
//     console.log(err.message);
//   }
// };

//test("The forEach function test", () => {
it("The forEach function test", () => {
  let sum = 0;
  forEach([1, 2, 3], value => {
    sum += value;
  });
  // if (sum !== 6) {
  //   throw new Error("Expected summing array to equal 6!");
  // }
  //assert.strictEqual(sum, 7, "Expected summing array to equal 6!");  //fails and throws an error
  assert.strictEqual(sum, 6, "Expected summing array to equal 6!");
});

//test("The map function test", () => {
it("The map function test", () => {
  const result = map([1, 2, 3], value => {
    return value * 2;
  });
  //result === [2, 4, 6]

  // if (result[0] !== 2) {
  //   throw new Error("Expected to find 4, but not found!");
  // }
  // if (result[1] !== 4) {
  //   throw new Error("Expected to find 8, but not found!");
  // }
  // if (result[2] !== 6) {
  //   throw new Error("Expected to find 12, but not found!");
  // }

  // assert.strictEqual(result[0], 2, "Expected to find 2, but not found!");
  // assert.strictEqual(result[1], 4, "Expected to find 4, but not found!");
  // assert.strictEqual(result[2], 6, "Expected to find 6, but not found!");
  assert.deepStrictEqual(
    result,
    [2, 4, 6],
    "Expected to find [2, 4, 6], but not found!"
  );
});
