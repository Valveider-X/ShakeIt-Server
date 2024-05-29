const router = require("express").Router()
const Cocktail = require("../models/Cocktail.models")
const Ingredient = require("../models/Ingredient.models")
const Comment = require("../models/Comment.model")

// GET "/api/ingredients" => recibit data(ingredientes)
router.get("/ingredients", async (req, res, next)=>{
    try {
        const ingredients = await Ingredient.find().exec() //.exec() ??
        res.json(ingredients)
        
    } catch (error) {
        next(error)
        
    }

})

// GET "/api/cocktails" => recibit data(cocktails)
router.get("/cocktails", async (req, res, next)=>{
    try {
        const cocktails = await Cocktail.find().exec()
        res.json(cocktails)
        
    } catch (error) {
        next(error)
        
    }
    
})

// GET "/api/cocktails/:cocktailId" => recibit data(cocktails detalles)
router.get("cocktails/:cocktailId", async (req, res, next)=>{
    try {
        const cocktailId = req.params.cocktailId
        const cocktail = await Cocktail.findById(cocktailId).exec()
        if (!cocktail){
            return res.status(404).json({message: "Cocktail not found"})
        }
        res.json(cocktail)
        
    } catch (error) {
        next(error)
        
    }
})

// POST "/api/cocktails" => añadir (cocktails)
router.post("/cocktails", async (req, res, next)=>{
    try {
        const cocktail = new Cocktail(req.body)
        await cocktail.save()
        res.status(201).json(cocktail)
        
    } catch (error) {
        next(error)
        
    }
})

// PUT "/api/cocktails/:cocktailId" => editar cocktail
router.put("/cocktails/:cocktailId", async (req, res, next)=>{
    try {
        const cocktailId = req.params.cocktailId
        const cocktail = await Cocktail.findByIdAndUpdate(cocktailId, req.body, {new: true}).exec()
        if (!cocktail){
            return res.status(404).json({message: "Cocktail not found"})
        }
        res.json(cocktail)
        
    } catch (error) {
        next(error)
        
    }
})

// DELETE "/api/cocktails/:cocktailId" => borrar cocktail
router.delete("/cocktails/:cocktailId", async (req, res, next)=>{
    try {
        const cocktailId = req.params.cocktailId
        await Cocktail.findByIdAndDelete(cocktailId).exec()
        res.status(204).json({message: "Cocktail deleted"})
        
    } catch (error) {
        next(error)
        
    }
})

// GET "/api/comments" => recibit data(comentarios)
router.get("/comments", async (req, res, next)=>{
    try {
        const comments = await Comment.find().exec()
        res.json(comments)
        
    } catch (error) {
        next(error)
        
    }
})

// POST "/api/comments" => añadir data(comentarios)
router.post("/comments", async (req, res, next)=>{
    try {
        const comment = new Comment(req.body)
        await comment.save()
        res.status(201).json(comment)
    } catch (error) {
        next(error)
        
    }
})

// PUT "/api/comments" => editar data(comentarios)
router.put("/comments/:commentId", async (req, res, next)=>{
    try {
        const commentId = req.params.commentId 
        const comment = await Comment.findByIdAndUpdate(commentId, req.body, {new: true}).exec()
        if(!comment){
            return res.status(404).json({message: "Comment not found"})
        }
        res.json(comment)
        
    } catch (error) {
        next(error)
        
    }
})

// PATCH "/api/comments" => editar un campo data(comentarios)
router.patch("/comments/:commentId", async (req, res, next)=>{
    try {
        const commentId = req.params.commentId
        const comment = await Comment.findByIdAndUpdate(commentId, req.body, {new: true}).exec()
        if (!comment){
            return res.status(404).json({message: "Comment not found"})
        }
        res.json(comment)
        
    } catch (error) {
        next(error)
        
    }
})


module.exports = router;