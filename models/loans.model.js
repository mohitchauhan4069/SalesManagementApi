const mongoose = require("mongoose");
const loanSchema = mongoose.Schema({
  loanName: String,
  loanType: String,
  loanAmmount: Number,
  loanIssue: Date,
  loanStatus: String,
  
});
const loanModel = mongoose.model("Loans", loanSchema);
module.exports = loanModel;
