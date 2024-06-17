const router = require("express").Router();
const Ingredient = require("../models/Ingredient.models");


// GET "/api/ingredients" //!OK
router.get("/", async (req, res, next) => {
    await Ingredient.find()
    .then((ingredients)=>{
    res.status(200).json(ingredients)
  })
  .catch((error) => {
    next(error);
  });
})

module.exports = router