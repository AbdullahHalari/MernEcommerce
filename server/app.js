const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    credentials: true,
  })
);
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./config.env" });
require("./dbcon");
app.use(express.json());
app.use(cookieParser());
app.use(require("./auth/auth"));

const User = require("./schema/userSchema");
const Products = require("./schema/productSchema");

const PORT = process.env.PORT;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file with a unique name
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../src/images/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });



const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
app.get('/token',(req,res)=>{
  const token = req.cookies.token;
  // console.log(token)
  res.status(201).json({ token });
  // res.send(token)
})
// Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Logout route
app.post("/api/logout", (req, res) => {
 console.log("Before clearing cookie");
 res.clearCookie("token");
 console.log("After clearing cookie");

  res.json({ message: "Logout successful" });
});


app.post(
  "/api/productUpload",
  upload.array("productImages", 12),
  async (req, res) => {
    const {
      title,
      category,
      company,
      articleNo,
      price,
      featured,
      description,
      colors,
    } = req.body;
    const data = req.files
    // Ensure required fields are present
    if (!title || !description) {
      return res
        .status(422)
        .json({ error: "Title and description are required" });
    }

    // try {
      console.log(
        title,
        category,
        company,
        articleNo,
        price,
        featured,
        description,
        colors
      );
        console.log(req.body);
        console.log(req.files)
      // Assuming 'Products' is your Mongoose model
  //     const products = new Products({
  //       articleNo: articleNo,
  //       title: title,
  //       price: price,
  //       company: company,
  //       category: category,
  //       colors: colors,
  //       description: description,
  //       featured: featured,
  //       productImages: data.map((file) => ({
  //         data: file.buffer,
  //         contentType: file.mimetype,
  //       })),
  //     });

  //     // if (req.files && req.files.length > 0) {
  //     //   // Access files from req.files array
  //     //   products.productImages = req.files.map((file) => ({
  //     //     data: file.buffer,
  //     //     contentType: file.mimetype,
  //     //   }));
  //     //   console.log(products.productImages);
  //     // }
  //     console.log(
  //       data
  //     );
  //     const ProductsReg = await products.save();

  //     if (ProductsReg) {
  //       res.status(201).json({ message: "Successfully stored" });
  //     } else {
  //       res.status(500).json({ error: "Failed to store" });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  }
);



// Protected route
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Access granted" });
});


app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
