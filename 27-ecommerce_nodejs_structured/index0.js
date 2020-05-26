const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

/*
app.post("/", (req, res) => {
  req.on("data", data => {
    //just like req.addEventListener(event is receiving some data...)
    //console.log(data);
    console.log(data.toString("utf8"));
  });
  res.send("Account created!");
});
*/

app.post("/", (req, res) => {
  req.on("data", data => {
    const parsed = data.toString("utf8").split("&");
    //split converts a string into an array
    //str.split("&") --> "halil&emel".split("&") => ["halil", "emel"]
    //str.split("") --> "halil&emel".split("") => ["h","a","l","i","l","&","e","m","e","l"]
    //str.split() --> "halil&emel".split() => ["halil&emel"]
    console.log(parsed);
    const formData = {};
    for (let pair of parsed) {
      const [key, value] = pair.split("=");
      formData[key] = value;
    }
    console.log(formData);
  });
  res.send("Account created!");
});

app.listen(3000, () => {
  console.log("Listening...");
});
