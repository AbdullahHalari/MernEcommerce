const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log("token", token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("verifyToken", verifyToken);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log(rootUser)
    if (!rootUser) {
      console.log("user not found");
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
  } catch (error) {
    res.status(400).json({ error: "unauth no token" });
    // res.status(401).json({ error: "unauth no token" });
    console.log(error);
  }
};
module.exports = authenticate;
