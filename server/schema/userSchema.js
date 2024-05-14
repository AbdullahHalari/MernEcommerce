const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET);
    this.tokens.push({ token }); // Add token to the tokens array
    await this.save(); // Save the updated user document
    console.log("Token saved:", token);
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

const User = mongoose.model("libaasusers", userSchema);

module.exports = User;
