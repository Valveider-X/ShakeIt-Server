const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const Ingredient = require("../models/Ingredient.models");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid

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
    .populate("owner")
    .populate("ingredients")
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
//TENGO QUE IMPORTAR TOKEN
// POST "/api/cocktails" => añadir (cocktails) //!OK
router.post("/cocktails",  isTokenValid,  async (req, res, next) => {
    console.log(req.payload._id); //!CONSOLE
    Cocktail.create({
        name: req.body.name,
        category: req.body.category,
        img: req.body.img,
        description: req.body.description,
        ingredients:req.body.ingredients,
        steps:req.body.steps,
        owner:req.payload._id,
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

// GET "/api/comments" => recibit data(comentarios)// !OK
router.get("/comments", async (req, res, next) => {
 await Comment.find()
    .populate("user")
    .populate("cocktail") 
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
    const response = await Comment.findById(req.params.commentId)
    .populate("user")
    .populate("cocktail") 
    res.status(200).json(response);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

// POST "/api/comments" => añadir data(comentarios)// !OK
router.post("/comments", async (req, res, next) => {
    Comment.create({
        user: req.body.user,
        cocktail: req.body.cocktail,
        description: req.body.description,
        })
    .then(()=>{
        res.sendStatus(201)
    })
    .catch((e)=>{
        next(e)
    })
});
  

// PUT "/api/comments" => editar data(comentarios)// !OK
router.put("/comments/:commentId", async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
       /*  user: req.body.user,
        cocktail: req.body.cocktail, */
        description: req.body.description,
    });
    res.sendStatus(201);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    next(error);
  }
});
//TODO HACER ENTERO
// PATCH "/api/comments" => editar un campo data(comentarios) //usuarios,
// "/api/user/:cocktailId/fav <-- ruta  a seguir para meter propiedad fav
router.patch("/user/:cocktailId/fav", isTokenValid, async (req, res, next) => {
  //buscar propiedad y con condicional, booleano y cambiar "polaridad"
  try {
      //1ero Pillo el propietario en la DB.
    const response = await User.findById(req.payload._id)
    //propiedad de favoritos, leo cocktailId (3)
    console.log("pito"); 
    console.log(response.favorites); 
    console.log(req.params.cocktailId); 
   //si el coctel existe en la lista de favs, lo quito de fav si no existe lo meto.
   if (!response.favorites.includes(req.params.cocktailId)){
    //si incluye el coctel haz :
    await User.findByIdAndUpdate(req.payload._id, {$addToSet: {favorites: req.params.cocktailId}}) 
    //Mete el coctel dentro
   }else{
    await User.findByIdAndUpdate(req.params.cocktailId, {$pull: {favorites: req.params.cocktailId}})
   }

   res.json({message: "Updated favorite Cocktails"})
    
    //await User.findByIdAndUpdate(req.params.favo)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
