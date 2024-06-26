const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isTokenValid } = require("../middlewares/auth.middlewares");
const cors = require("cors");

//AUTH ROUTES

//POST "/api/auth/signup"
router.post("/signup", async (req, res, next) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(400).json({ errorMessage: "All fields required" });
    return;
  }
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({ errorMessage: "The password is not strong enough." });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res
        .status(400)
        .json({ errorMessage: "User already registered with this e-mail" });
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      email: email,
      username: username,
      password: hashPassword,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//POST "/api/auth/login"
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ errorMessage: "All fields are required." });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "This user doesn't exist" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    console.log(isPasswordCorrect);
    if (isPasswordCorrect === false) {
      res.status(400).json({ errorMessage: "Wrong Password!" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

//GET "/api/auth/verify"
router.get("/verify", isTokenValid, (req, res, next) => {
  res.status(200).json({ payload: req.payload });
});

//rutas para usuarios logueados(private)
router.get("/profile", isTokenValid, async (req, res) => {
  try {
    const response = await User.findById(req.payload._id).populate({
      path: "favorites",
      select: "name",
    });
    res.status(200).json(response);
  } catch (error) {}
});

module.exports = router;
