const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const shakeitRouter = require ("./shakeit.routes")
router.use("/", shakeitRouter)

module.exports = router;
