const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    productPrice: Number,
    productQuantity: Number,
    productImage: {
      data: Buffer,
      contentType: String,
    },
    active: Boolean,
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    productCategory: [String],
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;
