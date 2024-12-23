const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3010;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//EP: 1
function calulateCartPrice(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calulateCartPrice(newItemPrice, cartTotal).toString());
});

//EP: 2
function totalPriceAfterDiscount(cartTotal, isMember) {
  if (isMember) {
    return cartTotal - cartTotal * (discountPercentage / 100);
  }
  return cartTotal;
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(totalPriceAfterDiscount(cartTotal, isMember).toString());
});

//EP: 3
function calculateTax(cartTotal) {
  return cartTotal * (taxRate / 100);
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

//EP: 4
function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return distance / 100;
  }
  return distance / 50;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
});

//EP: 5
function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

//EP: 6
function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
