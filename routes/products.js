var express = require("express");
var router = express.Router();
const productModel = require("../models/products.model");
router.get("/list", async function (req, res) {
  const ProductList = await productModel.find();
  const productCount = await productModel.countDocuments();
  res.send({
    status: 200,
    message: "All products retrive..",
    allProducts: ProductList,
    count: productCount,
  });
});
router.post("/add", async function (req, res, err) {
  const productObj = new productModel({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productQuantity: req.body.productQuantity,
    productImage: req.body.productImage,
    active: req.body.active,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    productCategory: req.body.productCategory,
  });
  // if (err) {
  //   res.send({
  //     status: 400,
  //     message: "Product already exist..",
  //   });
  //   return;
  // }
  let response = await productObj.save();
  res.send({
    status: 200,
    productDetails: response,
  });
});
router.get("/top-product", async function (req, res) {
  const ProductList = await productModel
    .find({})
    .sort({ productQuantity: "desc" })
    .limit(10);
  res.send({
    status: 200,
    message: "Top 10 Quantity products retrive..",
    allProducts: ProductList,
  });
});
router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productModel.findByIdAndDelete(id);
    res.send(`Document with ${data} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
