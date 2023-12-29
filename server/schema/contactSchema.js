const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  
});

const Contact = mongoose.model("libaascontact", contactSchema);
module.exports = Contact;
