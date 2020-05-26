const express = require("express");
//const cartsRepo = require("../repositories/carts");

const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");
const cartShowTemplate = require("../views/carts/show");

const router = express.Router();
//Receive a POST request to add an item to a cart
//Receive a GET request to show all items in a cart
//Receive a POST request to delete an item from a cart

router.post("/cart/products", async (req, res) => {
  //console.log(req.body.productId); //productId comes from a hidden input from the form in "views/products/index.js"

  //remember that req.session item managed by "cookie-session" npm pack
  let cart;
  if (!req.session.cartId) {
    //we don't have a cart, we need to create one, and store the cart id on the req.session.cartId
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    //we have a cart! Lets get it from the repository
    cart = await cartsRepo.getOne(req.session.cartId);
    if (!cart) {
      //should be in the repo but could not find it, then create a new one!
      cart = await cartsRepo.create({ items: [] });
      req.session.cartId = cart.id;
    }
  }
  //  console.log(cart);

  //Either increment quantity for existing product OR add new product to items array
  const existingItem = cart.items.find(item => item.id === req.body.productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, { items: cart.items });

  //res.send("Product added to cart!");
  res.redirect("/cart");
});

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    return res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    //item === { id:..., quantity:...}
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

router.post("/cart/products/delete", async (req, res) => {
  //console.log(req.body.itemId);
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  //deleted item has been filtered out from the items array
  const items = cart.items.filter(item => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });
  res.redirect("/cart");
});

module.exports = router;
