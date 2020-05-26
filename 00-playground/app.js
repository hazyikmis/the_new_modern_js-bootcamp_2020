let num = 7;

function f(num) {
  let x;
  x = num * 2 + 1;
  //console.log(x);
  return x;
}

num === 7 ? console.log(f(num)) : console.log("nooo");

let arr1 = new Array(1, 2, 3, "aaa", 0, true, NaN, null, undefined);
// same as
let arr2 = [1, 2, 3, "aaa", 0, true, NaN, null, undefined];

const student = {
  voornaamn: "Yamo",
  naam: "Azy",
  lessen: ["wereld", "wiskunde"],
  examen: {
    tentamen: 30,
    laatste: 90
  },
  gemiddeldeScore: function() {
    return Math.round(
      (4 * this.examen.tentamen + 6 * this.examen.laatste) / 10
    );
  }
};

let subreddits = ["soccer", "popheads", "cringe", "books"];
for (let i = 0; i < subreddits.length; i++) {
  console.log(subreddits[i]);
}
//better way:
for (let sub of subreddits) {
  console.log(sub);
}

for (let char of "cockadoodledoo") {
  console.log(char.toUpperCase());
}

//ITERATING OBJECTS
const movieReviews = {
  Arrival: 9.5,
  Alien: 9,
  Amelie: 8,
  "In Bruges": 9,
  Amedeus: 10,
  "Kill Bill": 8,
  "Little Miss Sunshine": 9.5,
  Coraline: 7.5
};

//NOT WORKS!!!
// for (let movie of movieReviews) {
//   console.log(movie);
// }

for (let movie of Object.keys(movieReviews)) {
  console.log(movie, movieReviews[movie]);
}

const ratings = Object.values(movieReviews);
let total = 0;
for (let r of ratings) {
  total += r;
}
total /= ratings.length; //total is no more means total, its average
console.log(total);

/****************/

function avgOfNums(arr) {
  let sum = 0;
  for (let num of arr) sum += num;
  return sum / arr.length;
}

/****************/

function isPangram(sentence) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const lowerCaseSentence = sentence.toLowerCase();
  for (let char of alphabet) {
    if (lowerCaseSentence.indexOf(char) === -1) return false;
    //if (!lowerCaseSentence.includes(char)) return false;
  }
  return true;
}

/****************/

function getRandomCard() {
  const suits = ["clubs", "spades", "hearts", "diamonds"];
  const nums = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];

  const suitIdx = Math.floor(Math.random() * suits.length);
  const numIdx = Math.floor(Math.random() * nums.length);

  return { suit: suits[suitIdx], num: nums[numIdx] };
}

function getRandomCard2() {
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const suits = ["clubs", "spades", "hearts", "diamonds"];
  const nums = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];

  return { suit: pick(suits), num: pick(nums) };
}

/****************/

let animals = ["paard", "konijn", "hond", "kat"];
var i = 10;
for (var i = 0; i < animals.length; i++) {
  console.log(animals[i]);
}
console.log(i); //last "i", not "10" (if we used "let" instead of "var", we would get "10")

/****************/

function multiplyBy(num) {
  return function(val) {
    return val * num;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);
const halve = multiplyBy(0.5);

console.log(double(5));
console.log(triple(5));
console.log(halve(5));

/****************/

function makeBetweenFunc(x, y) {
  return function(val) {
    return val >= x && val <= y;
  };
}

const isBetween0And10 = makeBetweenFunc(0, 10);
const isNineties = makeBetweenFunc(1990, 1999);
const isNiceWeather = makeBetweenFunc(18, 25);

console.log(isBetween0And10(13));
console.log(isBetween0And10(7));
console.log(isNineties(1991));
console.log(isNiceWeather(23));

/****************/
//*** REDUCE */
const nums = [3, 4, 5, 6, 7];
const product = nums.reduce((acc, num) => acc * num);
console.log(3 * 4 * 5 * 6 * 7, product);

const grades = [22, 56, 91, 19, 55, 75, 27, 44, 63];
const maxGrade = grades.reduce((max, val) => (val > max ? val : max));
const maxGrade2 = grades.reduce((max, val) => Math.max(max, val));
const maxGrade3 = Math.max(...grades);
console.log(
  "maxGrade",
  maxGrade,
  "maxGrade2",
  maxGrade2,
  "maxGrade3",
  maxGrade3
);

//TALLYING:
const votes = ["n", "y", "y", "y", "n", "y", "n", "n", "y", "y", "y", "y", "n"];
const result = votes.reduce(
  (tally, vote) => {
    tally[vote]++;
    return tally;
  },
  { y: 0, n: 0 }
);
console.log(result);

const votes2 = ["n", "y", "y", "n", "x", "y", "z", "y", "y", "x", "n"];
const result2 = votes2.reduce((tally, vote) => {
  if (tally[vote]) {
    tally[vote]++;
  } else {
    tally[vote] = 1;
  }
  return tally;
}, {});
console.log(result2);

// *** PERFECT USAGE OF REDUCE !!!
const votes3 = ["n", "y", "y", "n", "x", "y", "z", "y", "y", "x", "n"];
const result3 = votes3.reduce((tally, vote) => {
  tally[vote] = (tally[vote] || 0) + 1;
  return tally;
}, {});
console.log(result3);

const books = [
  {
    title: "American Gods",
    authors: ["Neil Gaiman"],
    rating: 4.11,
    genres: ["fiction", "fantasy"]
  },
  {
    title: "The name of the Wind",
    authors: ["Patrick Rothfuss"],
    rating: 4.54,
    genres: ["fiction", "fantasy"]
  },
  {
    title: "A Gentleman in Moscow",
    authors: ["Amor Towles", "Another Writer"],
    rating: 3.93,
    genres: ["fiction", "history"]
  },
  {
    title: "Wasp Factory",
    authors: ["AAAA BBBB"],
    rating: 3.97,
    genres: ["fiction", "horror"]
  }
];

// {
//   2: [{book1}, {book2}, ...],
//   3: [{book1}, {book2}, ...],
//   4: [{book1}, {book2}, ...]
// }

const groupedBooksByStars = books.reduce((groupedBooks, book) => {
  const key = Math.floor(book.rating);
  if (!groupedBooks[key]) groupedBooks[key] = [];
  groupedBooks[key].push(book);
  return groupedBooks;
}, {});
console.log(groupedBooksByStars);

//**  DEFAULT PARAMS */
const greet = (person, greeting = "Hi") => {
  console.log(`${greeting} ${person}`);
};
greet("Halil", "Merhaba");
greet("Halil");

//** SPREAD */
//Expands an iterable (array, string, etc.) into a list of argumnets:
const nummers = [9, 2, 5, 4, 8];
Math.max(nummers); //NaN  => use spread, because "Math.max()" expects a list of arguments like "Math.max(9, 2, 5, 4, 8)"
Math.max(...nummers);

const turkey = ["ankara", "istanbul", "bursa"];
const belgium = ["brussels", "antwerpen", "ghent", "leuven"];
const myCities = [...turkey, ...belgium];
//same as
const myCities2 = turkey.concat(belgium);

//can be used to copy the contents of an array/object to another
const copyTurkey = [...turkey];
//but be careful, copyTurkey === turkey returns FALSE because referencing different memory addresses

//**** SPREADING STRINGS */
"abcdef".split("");
//["a", "b", "c", "d", "e", "f"]
//same as
[..."abcdef"];

const numsObj = { ...[4, 5, 6] };
console.log(numsObj);
//{0: 4, 1: 5, 2: 6}
const charsObj = { ..."abcdef" };
console.log(charsObj);
//{0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f"}

//** ARGUMENTS */
function sum() {
  //console.log(arguments);
  //return arguments.reduce((tot, val) => tot + val); //NOT WORKS! Because "arguments" is array-like but it cannot be used as "array" type
  const argsArr = [...arguments];
  return argsArr.reduce((tot, val) => tot + val);
}

//arguments object DO NOT work with ARROW FUNCTIONS!!!
//For the arrow function below, if you call it, it will definitely throw an error!
const multiply = () => {
  //console.log(arguments); //CANNOT CALL arguments
  const argsArr = [...arguments]; //DO NOT WORKS!
  return argsArr.reduce((tot, val) => tot * val);
};

//** REST */
//for the example "sum" function above: in place of using "arguments" as default, we can use "...args" as parameter at the definition and we can use it as normal array (no need to convert it argsArr)
function sum2(...args) {
  //console.log(args);
  return args.reduce((tot, val) => tot + val);
}

function fullName(first, last, ...titles) {
  console.log("first", first);
  console.log("last", last);
  console.log("titles", titles); //titles contains just the remaining params after the first 2
  console.log("arguments", arguments); //arguments contains all params, including first & last
}
//fullName("Halo", "Azy", "Müh.", "Alb", "Ex");

//GOOD NEWS! rest operator DO works with ARROW FUNCTIONS!!!
//for the example multiply above:
const multiply2 = (...args) => {
  //console.log(args);
  return args.reduce((tot, val) => tot * val);
};

//*** DESTRUCTURING ARRAYS */  ---> ORDER IS IMPORTANT!
const raceResults = ["Ali", "Veli", "Memo", "Musti", "Cemal"];
const [gold, silver, bronze] = raceResults;
//gold <-- "Ali", silver <-- "Veli", bronze <-- "Memo"
const [winner, , , fourth] = raceResults;
//winner <-- "Ali", fourth <-- "Musti"
const [first, ...others] = raceResults;
//first <-- "Ali", others <-- ["Veli", "Memo", "Musti", "Cemal"]

//*** DESTRUCTURING OBJECTS */
const runner = {
  firstName: "Eliud",
  lastName: "Kipchoge",
  country: "Kenya",
  title: "Elder of the Order of the Golden Heart of Kenya"
};

const { firstName, lastName, age } = runner;
//firstName <-- "Eliud", lastName <-- "Kipchoge, age <-- undefined

const { country: nation, title: honorofic } = runner;
//nation <-- country ("Kenya") !!! (our variable is "nation")
//honorofic <-- title ("Elder of ...") !!! (our variable is "honorofic")

const runner2 = {
  firstN: "Eliud",
  lastN: "Kipchoge",
  count: "Kenya",
  titles: "Elder of the Order of the Golden Heart of Kenya"
};

const { firstN, lastN, ...otherInfo } = runner2;
//firstN <-- "Eliud", lastN <-- "Kipchoge, otherInfo <-- {count: "Kenya", titles: "Elder of ..."}

//GOOD EXAMPLE FOR DESTRUCTURING
//below is the first, second and the third runners info in order
const results = [
  {
    firstAd: "Eluid",
    lastAd: "Kipchoge",
    countryAd: "Kenya"
  },
  {
    firstAd: "Feyisa",
    lastAd: "Lilesa",
    countryAd: "Ethiopia"
  },
  {
    firstAd: "Galen",
    lastAd: "Rupp",
    countryAd: "US"
  }
];

//Now, lets get the countryAd of the second runner (Ethiopia) and store it in the "countryAd" constant
const [, { countryAd }] = results;

//Now, lets get the lastAd of the first runner (Kipchoge), save it into "lastAd" constant and countryAd of the third runner (US) and store it in the "natBronze" constant
const [{ lastAd }, , { countryAd: natBronze }] = results;

//With more understandable way:
const [goldWinner] = results;
const { firstAd } = goldWinner;
const [, , bronzeWinner] = results;
const { countryAd: natBronzeWinner } = bronzeWinner;

//** DESTRUCTURING PARAMETERS */

const response = ["HHTP/1.1", "200 OK", "application/json"];

function parseResponse(res) {
  const [protocol, statusCode, contentType] = res;
  console.log(
    `Protocol:${protocol} statusCode:${statusCode} contentType:${contentType}`
  );
}
parseResponse(response);

//parsing directly as parameter is seems to be better
function parseResponse2([protocol, statusCode, contentType]) {
  console.log(
    `Protocol:${protocol} statusCode:${statusCode} contentType:${contentType}`
  );
}
parseResponse2(response);

const man = {
  first: "Eluid",
  last: "Kipchoge",
  country: "Kenya",
  title: "...."
};

function printMan(person) {
  const { first, last, country } = person;
  console.log(`${first} ${last} ${country}`);
}
printMan(man);

function printMan2({ first, last, country }) {
  console.log(`${first} ${last} ${country}`);
}
printMan2(man);

//** OBJECTS: Computed Properties */

const role = "host";
const person = "Jools Holland";
const role2 = "Director";
const person2 = "James Cameron";

const team = {};
team[role] = person;
//team => {host: "Jools Holland"}
team[role2] = person2;
//team => {host: "Jools Holland", Director: "James Cameron"}

const team2 = {
  [role]: person,
  [role2]: person2,
  [1 + 6 + 9]: "sixteen"
};

function addProp(obj, k, v) {
  const copy = { ...obj };
  copy[k] = v;
  return copy;
}

const res = addProp(team, "happyFace", ":)");
console.log(res);

//SUPER SIMPLE & BETTER:
//const addProp2 = (obj, k, v) => { ...obj, [k]: v }; //IMPLICIT RETURN, But JS confuses because the returning value is an object, starts with "{" !
const addProp2 = (obj, k, v) => ({ ...obj, [k]: v });

const res2 = addProp2(team, "slechtFace", ":(");
console.log(res2);

//** OBJECT METHODS */
//ARROW FUNCTIONS GENERALLY NOT PREFERRED WHEN DEFINING OBJECT METHODS BECAUSE "this" KEYWORD BEHAVES DIFFERENTLY!!!
//1-Uncommon Way
const addd = function(x, y) {
  return x + y;
};

const mul = (x, y) => x * y;

const mathh = {
  addd,
  mul
};

console.log(mathh.addd(3, 7));
console.log(mathh.mul(3, 7));

//2-Common Way
const mathh2 = {
  addd: function(x, y) {
    return x + y;
  },
  mul: (x, y) => x * y
};

console.log(mathh2.addd(3, 5));
console.log(mathh2.mul(3, 5));

//3-VERY Common Way (BEST!)
const mathh3 = {
  addd(x, y) {
    return x + y;
  },
  mul(x, y) {
    return x * y;
  },
  login() {
    console.log("Logged you in!");
  }
};

console.log(mathh3.addd(3, 5));
console.log(mathh3.mul(3, 5));
mathh3.login();

//** THIS */
var color = "teal"; //"color" added to the window. If you call "window.color", it returns "teal"
let numberx = 100; //"numberx" DO NOT added to the window!!! If you cal "window.numberx", it returns "undefined"
const ggg = 888; //behaves like let

const human = {
  first: "Halil",
  last: "Azyikmis",
  nickName: "Halo",
  fullName() {
    //console.log(`${this.first} ${this.last} aka ${this.nickName}`);
    const { first, last, nickName } = this;
    //console.log(`${first} ${last} aka ${nickName}`);
    return `${first} ${last} aka ${nickName}`;
  },
  printBio() {
    //console.log(`${fullName()} is a very clever person!`);  // DO NOT WORKS!
    console.log(`${this.fullName()} is a very clever person!`);
  },
  laugh: () => {
    console.log(`${this.nickName} says Hahahahaha!`);
  }
};

//human.fullName();
human.printBio();

// NOTE: value of "this" depends on the context where how it called/used (INVOCATION CONTEXT DEPENDENT)!!!
// 1- ATTENTION!!!
const printBio = human.printBio;
//Now if I call "printBio()" directly on the console, I will get "this.fullName is not a function" ERROR!!!

//human.printBio() --> "this" inside the human.printBio method refers to human object
//printBio() --> "this" inside the human.printBio method refers to window object

// 2- ATTENTION!!!
//"this" used in the Arrow functions do not refer to parent object, it refers to global/window object
//Because of that arrow functions generally do not used in defining object methods
//The behaviour of "this" in arrow function sometimes a good and sometimes a bad thing :)
human.laugh();
//expected result: "Halo says Hahahahaha!"
//but actual outcome: "Undefined says Hahahahaha!"

const annoyer = {
  phrases: [
    "literally",
    "are you sure?",
    "naber, nasilsin?",
    "bu gün hava super",
    "i'm not sure",
    "cray cray"
  ],
  pickPhrase() {
    const { phrases } = this;
    const idx = Math.floor(Math.random() * phrases.length);
    return phrases[idx];
  },
  startWithProblem() {
    console.log(this.pickPhrase()); //this line runs without any problem
    setInterval(function() {
      console.log(this);
      console.log(this.pickPhrase()); //this line throws an error, because this refers to window object ("setInterval" calls the function, its registered on the window object)
    }, 3000);
  },
  startWithoutProblem() {
    //console.log(this.pickPhrase()); //this line runs without any problem
    const that = this;
    setInterval(function() {
      //console.log(that);
      console.log(that.pickPhrase());
    }, 3000);
  },
  startWithoutProblem2_Better() {
    //use arrow function in case of problems like "startWithProblem"
    setInterval(() => {
      console.log(this.pickPhrase());
    }, 3000);
  },
  start() {
    //use arrow function in case of problems like "startWithProblem"
    //In order to access this timer from another method (to stop it), we are adding this "key:value" pair to parent object (annoyer)
    this.timerId = setInterval(() => {
      console.log(this.pickPhrase());
    }, 3000);
  },
  stop() {
    clearInterval(this.timerId);
    console.log("PHEW, THANK HEAVENS THAT IS OVER!");
  }
};
