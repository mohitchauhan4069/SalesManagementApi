const mongoose = require("mongoose");
const salesSchema = mongoose.Schema({
  customer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,     
    },
    name: String,
  },
  product: {
    id: {
      type: mongoose.Schema.Types.ObjectId,     
    },
    name: String,
  },
  productQuantity: Number,
  productPrice: Number,
  totalAmount:Number,
  currentPayment: Number,
  remaningPayment: Number,
  paymentMode: {
    type: String,
    enum: ["Upi", "Card", "Cash", "NA"],
    default: "Cash",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const salesModel = mongoose.model("Sales", salesSchema);
module.exports = salesModel;
