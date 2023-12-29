const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  articleNo: {
    type: String,
    required: true,
  },
  name: {
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
  featured: {
    type: Boolean,
    required: true,
  },
  colors: {
    type: [String], // Array of strings
    requied: true,
  },
});


const Products = mongoose.model("libaasProducts", productSchema);
module.exports = Products;
