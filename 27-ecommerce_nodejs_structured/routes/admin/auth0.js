const express = require("express");
const usersRepo = require("../../repositories/users");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(`
    <div>
      Your ID is: ${req.session.userID}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

//If we write "app.use(bodyParser.urlencoded({ extended: true }))" then we do NOT NEED to write it down
//inside all route calls. This means: the functions defined as "app.use(func)" is being called as middleware globally
//..means called as middleware in each route
//app.post("/", bodyParser.urlencoded({ extended: true }), (req, res) => {
router.post("/signup", async (req, res) => {
  //console.log(req); //to inspect req object
  //console.log(req.body);
  const { email, password, passwordConfirmation } = req.body;
  //const existingUser = await usersRepo.getOneBy({email: email});
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use!");
  }

  if (password !== passwordConfirmation) {
    return res.send("Passwords must match!");
  }

  //create a user in our repo to represent this user
  //const newUser = await usersRepo.create({ email: email, password: password });
  const newUser = await usersRepo.create({ email, password });

  //Store the id of that user inside the users cookie
  //"req.session" added by cookie-session, normally no session in the request object. If you do not use "cookie-session" then there will be no "req.session"
  //req.session === {}; //plain text object; you can store whatever you want. For ex: req.session.userIDofPersonMakingThisRequest = user.id;
  req.session.userID = newUser.id;

  res.send("Account created!");
});

router.get("/signout", (req, res) => {
  req.session = null; //means forget ALL the INFO stored in the cookie(s)
  res.send("You are logged out!");
});

router.get("/signin", (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
  `);
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email not found!");
  }

  // if (user.password !== password) {
  //   return res.send("Invalid password!");
  // }
  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );
  if (!validPassword) {
    return res.send("Invalid password!");
  }

  req.session.userID = user.id;

  res.send("You are signed in!");
});

//with the line below, all routes are available to other files of the project!
module.exports = router;
