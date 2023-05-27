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
router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await customerModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//delete  customer
router.delete('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await customerModel.findByIdAndDelete(id)
      res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

module.exports = router;
