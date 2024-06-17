const router = require("express").Router();
const User = require("../models/User.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid;

// PATCH "/api/user/:cocktailId/fav
router.patch("/:cocktailId/fav", isTokenValid, async (req, res, next) => {
  try {
    //1ero Pillo el propietario en la DB.
    const response = await User.findById(req.payload._id);
    //propiedad de favoritos, leo cocktailId (3)
    console.log(response);
    console.log(req.params.cocktailId);
    //si el coctel existe en la lista de favs, lo quito de fav si no existe lo meto.
    if (!response.favorites.includes(req.params.cocktailId)) {
      //si incluye el coctel haz :
      await User.findByIdAndUpdate(req.payload._id, {
        $addToSet: { favorites: req.params.cocktailId },
      });
      //Mete el coctel dentro
    } else {
      await User.findByIdAndUpdate(req.payload._id, {
        $pull: { favorites: req.params.cocktailId },
      });
    }
    //corazon que cuando le des click te rediriga a tu perfil con tus favoritos.
    res.json({ message: "Updated favorite Cocktails" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
