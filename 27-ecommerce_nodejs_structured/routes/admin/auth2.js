const express = require("express");
const { check, validationResult } = require("express-validator"); //we only care about the "check" & "validationResult" functionalities

const usersRepo = require("../../repositories/users");
const signUpTemplate = require("../../views/admin/auth/signup");
const signInTemplate = require("../../views/admin/auth/signin");

const router = express.Router();

router.get("/signup", (req, res) => {
  //res.send(signUpTemplate({ req: req }));
  res.send(signUpTemplate({ req }));
});

//router.post("/signup", async (req, res) => {
router.post(
  "/signup",
  [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must be a valid email")
      .custom(async email => {
        const existingUser = await usersRepo.getOneBy({ email });
        if (existingUser) {
          //return res.send("Email in use!");
          throw new Error("Email in use!");
        }
      }),
    check("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters"),
    check("passwordConfirmation")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 and 20 characters")
      .custom((passwordConfirmation, { req }) => {
        if (req.body.password !== passwordConfirmation) {
          //return res.send("Passwords must match!");
          throw new Error("Passwords must match!");
        }
      })
  ], //all validation results communicated with next step via "req" object
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    const { email, password, passwordConfirmation } = req.body;
    //All checks/validation done CENTRALLY in the middleware above!
    //so we have commented out the codes below
    // const existingUser = await usersRepo.getOneBy({ email });
    // if (existingUser) {
    //   return res.send("Email in use!");
    // }

    // if (password !== passwordConfirmation) {
    //   return res.send("Passwords must match!");
    // }

    const newUser = await usersRepo.create({ email, password });

    req.session.userID = newUser.id;

    res.send("Account created!");
  }
);

router.get("/signout", (req, res) => {
  req.session = null; //means forget ALL the INFO stored in the cookie(s)
  res.send("You are logged out!");
});

router.get("/signin", (req, res) => {
  res.send(signInTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email not found!");
  }

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

module.exports = router;
