var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const customerModel = require("../models/customers.model");

/* GET all customer */
router.get("/list", async function (req, res) {
  let list = await customerModel.find();
  let CustomerCount=await customerModel.countDocuments();
  res.send({
    status: 200,
    count:CustomerCount,
    customerDetails: list,
  });
});

//create new customer
router.post("/add", async function (req, res, next) {
  console.log("yes craete called >>>>>>>");
  let customerObj = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    dob: req.body.dob,
    department: req.body.department,
  });
  let response = await customerObj.save();
  res.send({
    status: 200,
    message: "user succesfullt addded..",
    userDetails: response,
  });
});

//update customer
router.put("/", function (req, res, next) {
  res.send("respond with a resource");
});

//delete  customer
router.delete("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
