const router = require("express").Router();
const Cocktail = require("../models/Cocktail.models");
const Ingredient = require("../models/Ingredient.models");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid

// GET "/api/comments" // !OK
router.get("/", async (req, res, next) => {
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
   
   // GET "/api/comments/commentId" // !OK
   router.get("/:commentId", async (req, res, next) => {
     try {
       const response = await Comment.findById(req.params.commentId)
       .populate("user")
       .populate("cocktail") 
       res.status(200).json(response);
       
      
     } catch (error) {
       next(error);
     }
   });
   
   // POST "/api/comments" // !OK
   router.post("/", async (req, res, next) => {
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
   router.put("/:commentId", async (req, res, next) => {
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
   //!OK
   // PATCH "/api/comments" => editar un campo data(comentarios) //usuarios,
   // "/api/user/:cocktailId/fav <-- ruta  a seguir para meter propiedad fav
   router.patch("/user/:cocktailId/fav", isTokenValid, async (req, res, next) => {
     //buscar propiedad y con condicional, booleano y cambiar "polaridad"
     try {
         //1ero Pillo el propietario en la DB.
       const response = await User.findById(req.payload._id)
       //propiedad de favoritos, leo cocktailId (3)
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