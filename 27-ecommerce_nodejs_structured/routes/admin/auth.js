const express = require("express");
//const { validationResult } = require("express-validator"); //we only care about the "check" & "validationResult" functionalities
////commented after adding "const { handleErrors } = require("./middlewares");"

const usersRepo = require("../../repositories/users");
const signUpTemplate = require("../../views/admin/auth/signup");
const signInTemplate = require("../../views/admin/auth/signin");
const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation,
  requireEmailExist,
  requireValidPasswordForUser
} = require("./validators");
const { handleErrors } = require("./middlewares");

const router = express.Router();

router.get("/signup", (req, res) => {
  //res.send(signUpTemplate({ req: req }));
  res.send(signUpTemplate({ req }));
});

//router.post("/signup", async (req, res) => {
//PLEASE CHECK THE auth2.js FOR PRIMITIVE VERSION (without using validators.js)
router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  handleErrors(signUpTemplate),
  async (req, res) => {
    /*
    //this section completely commented because of "handleErrors" middleware
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.send(signUpTemplate({ req, errors }));
    }
    */

    const { email, password } = req.body;
    const newUser = await usersRepo.create({ email, password });

    req.session.userID = newUser.id;

    //res.send("Account created!");
    res.redirect("/admin/products");
  }
);

router.get("/signout", (req, res) => {
  req.session = null; //means forget ALL the INFO stored in the cookie(s)
  res.send("You are logged out!");
});

router.get("/signin", (req, res) => {
  //res.send(signInTemplate());
  res.send(signInTemplate({})); //in order to make destructuring, send an empty object
});

/*
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
*/

/*
router.post(
  "/signin",
  [
    check("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Must provide a valid email!")
      .custom(async email => {
        const user = await usersRepo.getOneBy({ email });
        if (!user) {
          throw new Error("Email not found!");
        }
      }),
    check("password")
      .trim()
      .custom(async (password, { req }) => {
        const user = await usersRepo.getOneBy({ email: req.body.email });
        if (!user) {
          throw new Error("Invalid password!"); //Email not found!
        }
        const validPassword = await usersRepo.comparePasswords(
          user.password,
          password
        );
        if (!validPassword) {
          throw new Error("Invalid password!");
        }
      })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.send(signInTemplate({ errors }));
    }

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userID = user.id;

    res.send("You are signed in!");
  }
);
*/

router.post(
  "/signin",
  [requireEmailExist, requireValidPasswordForUser],
  handleErrors(signInTemplate),
  async (req, res) => {
    /*
    //this section completely commented because of "handleErrors" middleware
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      return res.send(signInTemplate({ errors }));
    }
    */

    const { email } = req.body;

    const user = await usersRepo.getOneBy({ email });

    req.session.userID = user.id;

    //res.send("You are signed in!");
    res.redirect("/admin/products");
  }
);

module.exports = router;
