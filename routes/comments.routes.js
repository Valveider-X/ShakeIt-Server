const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const Ingredient = require("../models/Ingredient.models");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid;

// GET "/api/comments"
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find().populate("user").populate("cocktail");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// GET "/api/comments/:cocktailId"
router.get("/:cocktailId", async (req, res, next) => {
  try {
    const response = await Comment.find({
      cocktail: req.params.cocktailId,
    }).populate({ path: "user", select: "username" });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/comments"
router.post("/", isTokenValid, async (req, res, next) => {
  try {
    await Comment.create({
      user: req.payload._id,
      cocktail: req.body.cocktail,
      description: req.body.description,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/comments/:commentId"
router.put("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      description: req.body.description,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/comments/:commentId
router.delete("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
