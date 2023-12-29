const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  articleNo: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  price: {
    type: Int16Array,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  colors: {
    type: String, // Array of strings
    requied: true,
  },
});

const Orders = mongoose.model("libaasProducts", orderSchema);
module.exports = Orders;
