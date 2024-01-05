const jwt = require("jsonwebtoken")
const path = require("path")
const multer = require("multer")



const middlewareController = {
    //verifyToken
    verifyToken : (req,res,next) => {
        const tokenHeader = req.header("Authorization");

        if (!tokenHeader) {
          return res.status(401).send({
            message: "Unauthorized: Token not provided",
          });
        }
      
        const token = tokenHeader.replace("Bearer ", "");
      
        try {
          const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
          req.user = decoded;
          next();
        } catch (error) {
          console.error("Token verification failed:", error);
          return res.status(401).send({
            message: "Unauthorized: Invalid token",
            token: token,
          });
        }
    },
}

module.exports = middlewareController;