const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = async (req , res , next) => {
    try {
        const Token = req.header("token");
        if(!Token){
            return res.status(403).json({msg : "Not authorized"});
        }
        const payload = await jwt.verify(Token , process.env.jwtsecret) ;
        req.user = payload.user ;
        next();
        
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({msg : "Not authorized, invalid token"});
    }
}