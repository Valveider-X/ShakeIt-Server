const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const Ingredient = require("../models/Ingredient.models");
const Comment = require("../models/Comment.model");

// GET "/api/ingredients" => recibit data(ingredientes) //!OK
router.get("/ingredients", async (req, res, next) => {
    await Ingredient.find()
    .then((ingredients)=>{
    res.status(200).json(ingredients)
  })
  .catch((error) => {
    next(error);
  });
})

// GET "/api/cocktails" => recibit data(cocktails) //!OK
router.get("/cocktails", async (req, res, next) => {
    await Cocktail.find()
    .then((cocktails)=>{
    res.status(200).json(cocktails);
})
.catch((error) =>{
    next(error)
})
});

// GET "/api/cocktails/:cocktailId" => recibit data(cocktails detalles) //!OK
router.get("/cocktails/:cocktailId", async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.cocktailId)
    .populate("ingredients") 
    res.status(200).json(cocktail);
    if (!cocktail) {
        return res.status(404).json({ message: "Cocktail not found" })
    }
  } catch (error) {
    next(error);
  }
});

// POST "/api/cocktails" => añadir (cocktails) //!OK
router.post("/cocktails", async (req, res, next) => {
    Cocktail.create({
        name: req.body.name,
        category: req.body.category,
        img: req.body.img,
        description: req.body.description,
        ingredients:req.body.ingredients,
        steps:req.body.steps,
        owner:req.body.owner,
    })
  .then(()=>{
    res.sendStatus(201)
  })
  .catch ((error)=>{
    next(error);
})

});

// PUT "/api/cocktails/:cocktailId" => editar cocktail //!OK
router.put("/cocktails/:cocktailId", async (req, res, next) => {
  try {
    await Cocktail.findByIdAndUpdate(req.params.cocktailId, {
        name: req.body.name,
        category: req.body.category,
        img:req.body.img,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        owner: req.body.owner
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/cocktails/:cocktailId" => borrar cocktail //!OK
router.delete("/cocktails/:cocktailId", async (req, res, next) => {
  try {
    await Cocktail.findByIdAndDelete(req.params.cocktailId);
    res.status(204).json({ message: "Cocktail deleted" });
  } catch (error) {
    next(error);
  }
});

// GET "/api/comments" => recibit data(comentarios)// TODO MIRAR POPULATE
router.get("/comments", async (req, res, next) => {
 await Comment.find()
    .then((comments)=>{
        res.status(200).json(comments)
    })
    .catch((error)=>{
        next(error)
    })
});

// GET "/api/comments/commentId" => recibir data(comentarios)// !OK
router.get("/comments/:commentId", async (req, res, next) => {
  try {
    const response = await Comment.findById(req.params.commentId);
    res.status(200).json(response);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// POST "/api/comments" => añadir data(comentarios)// TODO HACER DE NUEVO
router.post("/comments", async (req, res, next) => {
    Comment.create({

    });
  
});

// PUT "/api/comments" => editar data(comentarios)// TODO HACER DE NUEVO
router.put("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findByIdAndUpdate(commentId, req.body, {
      new: true,
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
});
//TODO HACER ENTERO
// PATCH "/api/comments" => editar un campo data(comentarios) //usuarios,
// "/api/user/:cocktailId/fav <-- ruta  a seguir para meter propiedad fav
router.patch("/user/:cocktailId/fav", async (req, res, next) => {
  //buscar propiedad y con condicional, booleano y cambiar "polaridad"
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
