var express = require("express");
var router = express.Router();
const salesModel = require("../models/sales.model");
/* GET users listing. */
router.get("/allSales", async function (req, res) {
  const salesList = await salesModel.find();
  const salesCount = await salesModel.countDocuments();
  res.send({
    status: 200,
    message: "All sales retrive..",
    allSales: salesList,
    count: salesCount,
  });
});
router.post("/addsales", async function (req, res) {
  const sales = {
    customer: {
      id: undefined,
      name: "default",
    },
    product: {
      id: undefined,
      name: "default",
    },
    productQuantity: 0,
    productPrice: 0,
    totalAmount: 0,
    currentPayment: 0,
    remaningPayment: 0,
    paymentMode: "NA",
  };
  const salesDto = req.body;

  if (!salesDto.customerId) {
    return res
      .status(400)
      .json({ status: 400, message: "SR_INVALID_CUSTOMER_ID" });
  }
  // for set customer id
  if (salesDto.customerId) {
    sales.customer.id = salesDto.customerId;
  }
  // for set product Id
  if (salesDto.productId) {
    sales.product.id = salesDto.productId;
  }
  // for set customer name
  if (salesDto.customerName) {
    sales.customer.name = salesDto.customerName;
  }
  // for set product name
  if (salesDto.productName) {
    sales.product.name = salesDto.productName;
  }
  if (salesDto.productPrice) {
    sales.productPrice = salesDto.productPrice;
  }
  if (salesDto.productQuantity) {
    sales.productQuantity = salesDto.productQuantity;
  }
  if (salesDto.totalAmount) {
    sales.totalAmount = salesDto.totalAmount;
  }
  if (salesDto.currentPayment) {
    sales.currentPayment = salesDto.currentPayment;
  }
  if (salesDto.paymentMode) {
    sales.paymentMode = salesDto.paymentMode;
  }
//ammount set and calculate
  if (salesDto.currentPayment) {
    sales.currentPayment = salesDto.currentPayment;
  }
  if (salesDto.totalAmount) {
    sales.totalAmount = salesDto.totalAmount;
  }
  if (salesDto.totalAmount) {
    sales.remaningPayment = salesDto.totalAmount;
    if (salesDto.currentPayment) {
      sales.remaningPayment -= sales.currentPayment;
    }
  }
  const salesObj = salesModel(sales);
  let response = await salesObj.save();
  res.send({
    status: 200,
    salesDetails: response,
  });
});

module.exports = router;
