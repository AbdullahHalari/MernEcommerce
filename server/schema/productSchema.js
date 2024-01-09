const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  articleNo: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
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
  // image: {
  //   type: [String],
  //   required: true,
  // },
  // productImages: [
  //   {
  //     data: Buffer,
  //     contentType: String,
  //   },
  // ],
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: String,
    required: true,
  },
  colors: {
    type: [String], // Array of strings
    requied: true,
  },
});

const Products = mongoose.model("libaasProducts", productSchema);
module.exports = Products;
