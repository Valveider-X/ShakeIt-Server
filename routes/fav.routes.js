const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const Ingredient = require("../models/Ingredient.models");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid


//!OK
   // PATCH "/api/comments" => editar un campo data(comentarios) //usuarios,
   // "/api/user/:cocktailId/fav <-- ruta  a seguir para meter propiedad fav
   router.patch("/:cocktailId/fav", isTokenValid, async (req, res, next) => {
    //buscar propiedad y con condicional, booleano y cambiar "polaridad"
    try {
        //1ero Pillo el propietario en la DB.
      const response = await User.findById(req.payload._id)
      //propiedad de favoritos, leo cocktailId (3)
      console.log(response); 
      console.log(req.params.cocktailId); 
     //si el coctel existe en la lista de favs, lo quito de fav si no existe lo meto.
     if (!response.favorites.includes(req.params.cocktailId)){
      //si incluye el coctel haz :
      await User.findByIdAndUpdate(req.payload._id, {$addToSet: {favorites: req.params.cocktailId}}) 
      //Mete el coctel dentro
     }else{
      await User.findByIdAndUpdate(req.payload._id, {$pull: {favorites: req.params.cocktailId}})
     }
  
     res.json({message: "Updated favorite Cocktails"})
      
      //await User.findByIdAndUpdate(req.params.favo)
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;