const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const Comment = require("../models/Comment.model")
const { isTokenValid } = require("../middlewares/auth.middlewares");


// GET "/api/cocktails"  //!OK
router.get("/", async (req, res, next) => {
try {
  const cocktails = await Cocktail.find()
  res.status(200).json(cocktails);
} catch (error) {
  next(error) 
}    
})


// GET "/api/cocktails/:cocktailId" //!OK
router.get("/:cocktailId", async (req, res, next) => {
  console.log(`detalle de coctel`);
  try {
    const cocktail = await Cocktail.findById(req.params.cocktailId)
    .populate({path: "owner", select: "username"})
   .populate({path: "ingredients", select:"name hasAlcohol alcoholGraduation description "})  
  
    res.status(200).json(cocktail);
    
  } catch (error) {
    next(error);
  }
});
// POST "/api/cocktails" //!OK
router.post("/",  isTokenValid,  async (req, res, next) => {
  console.log(req.body)
  try {
    
    await Cocktail.create({
      name: req.body.name,
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      ingredients:req.body.ingredients,
      steps:req.body.steps,
      owner: req.payload._id
    
  })
  res.sendStatus(201)
  } catch (error) {
    next(error) 
  }
});

// PUT "/api/cocktails/:cocktailId"  //!OK
router.put("/:cocktailId", isTokenValid, async (req, res, next) => {
  try {
    await Cocktail.findByIdAndUpdate(req.params.cocktailId, {
        name: req.body.name,
        category: req.body.category,
        img:req.body.img,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/cocktails/:cocktailId" (falta borrar por id) //!OK
router.delete("/:cocktailId", isTokenValid, async (req, res, next) => {
  try {
    await Cocktail.findByIdAndDelete(req.params.cocktailId);
    res.status(204).json({ message: "Cocktail deleted" });
  } catch (error) {
    next(error);
  }
});
module.exports = router