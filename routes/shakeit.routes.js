const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const Ingredient = require("../models/Ingredient.models");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid