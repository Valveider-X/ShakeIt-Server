const jwt = require("jsonwebtoken")

function isTokenValid (req, res, next){
    try {
        console.log(req.headers.authorization) //! console
        const token = req.headers.authorization.split(" ")[1]
        console.log(token) //! console

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log(payload) //!console
        req.payload = payload
        next()
        
    } catch (error) {
        res.status(401).json({errorMessage: "Token not valid or does not exist"})
        
    }
}
module.exports = { 
    isTokenValid
}