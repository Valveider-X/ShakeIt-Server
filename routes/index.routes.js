const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

/* const shakeitRouter = require ("./shakeit.routes")
router.use("/", shakeitRouter) */

const ingredientsRouter = require ("./ingredients.routes")
router.use("/ingredients", ingredientsRouter)

const cocktailsRouter = require ("./cocktails.routes")
router.use("/cocktails", cocktailsRouter)

const commentsRouter = require ("./comments.routes")
router.use("/comments", commentsRouter)


module.exports = router;

