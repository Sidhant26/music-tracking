const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let user = await User.findOne({ username });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     user = new User({ username, password });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.VITE_JWT_SECRET,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "username and password are required.",
        user: false,
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({
        status: "error",
        message: "User already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.VITE_JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      status: "ok",
      message: "User registered successfully",
      user: token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during registration.",
      errorMessage: error.message,
      errorStack: error.stack,
    });
  }
});

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid Credentials" });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.VITE_JWT_SECRET,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// router.get("/user", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "username and password are required.",
        user: false,
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid username or password.",
        user: false,
      });
    }

    //decode password and compare them:

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid username or password.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.VITE_JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "ok",
      user: token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during login.",
    });
  }
});

router.get("/hello", (req, res) => {
  res.send("Hello world");
});

module.exports = router;
