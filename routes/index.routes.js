const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const ingredientsRouter = require ("./ingredients.routes")
router.use("/ingredients", ingredientsRouter)

const cocktailsRouter = require ("./cocktails.routes")
router.use("/cocktails", cocktailsRouter)

const commentsRouter = require ("./comments.routes")
router.use("/comments", commentsRouter)

const favRouter = require("./fav.routes")
router.use("/user", favRouter) 

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;

