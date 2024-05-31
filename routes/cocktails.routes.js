const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid

// GET "/api/cocktails"  //!OK
router.get("/", async (req, res, next) => {
    await Cocktail.find()
    .populate("owner")
    .populate("ingredients")
    .then((cocktails)=>{
    res.status(200).json(cocktails);
})
.catch((error) =>{
    next(error)
})
});

// GET "/api/cocktails/:cocktailId" //!OK
router.get("/:cocktailId", async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.cocktailId)
    .populate("owner")
    .populate("ingredients") 
    res.status(200).json(cocktail);
    if (!cocktail) {
        return res.status(404).json({ message: "Cocktail not found" })
    }
  } catch (error) {
    next(error);
  }
});
// POST "/api/cocktails" //!OK
router.post("/",  isTokenValid,  async (req, res, next) => {
    Cocktail.create({
        name: req.body.name,
        category: req.body.category,
        img: req.body.img,
        description: req.body.description,
        ingredients:req.body.ingredients,
        steps:req.body.steps,
        owner: req.payload._id
      
    })
  .then(()=>{
    res.sendStatus(201)
  })
  .catch ((error)=>{
    next(error);
})

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