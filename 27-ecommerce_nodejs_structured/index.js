const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session"); //is a middleware function just like body-parse
// const usersRepo = require("./repositories/users");
const authRouter = require("./routes/admin/auth");
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

const app = express();
// We have migrated all routes -which were linked directly to the "app"- to another files (routes folder)
// So how we can link these routes again back to "app":
// We're going to create something called a sub router inside of the auth.js files so the one that we
// just created a sub router is essentially the same kind of router that is built into the app that we
// created back over here or we can create a separate router separately or less inside auth.js file
// export it then require it into index.js and link it up to app even though that might sound really
// complicated:
// 1.add at the beginning of auth.js (the js file where we have moved app.get/app.post routes to): const express = require("express");
// 2.add at the beginning of auth.js : const router = express.Router();
// 3.inside the auth.js, replace all "app.get" & "app.post" to "router.get" & "router.post"
// 4.add at the end of the auth.js: module.exports = router;
// 5.add at the beginning of this file (or any other file which we want to use from all routes defined in auth.js): const authRouter = require("./routes/admin/auth");
// 6.add inside this file (after other middlewares which should be run before, for ex: cookieSession middleware): app.use(authRouter);
// 7.Thats all, test it!

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); //this works with default forms (encoding type is "application/x-www-form-urlencoded")

app.use(
  cookieSession({
    keys: ["myS3cr3tPhrase..."] //used for to encrypt all info stored inside the cookie
  })
);
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
  console.log("Listening...");
});
