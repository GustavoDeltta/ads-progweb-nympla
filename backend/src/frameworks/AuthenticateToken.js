const jwt = require("jsonwebtoken");
 
function Authenticate(req, res, nextStage) {
    
    const token = req.headers.authorization?.split(" ")[1];
 
    console.log("Token: " + token);
 
    if (!token) {
        return res.status(404).json({ error: "Token not found!" });
    }
    try{
        const decoder = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoder);
        nextStage();
    }catch(error){
        return res.status(401).json({ error: "Invalid Token" });
    }
}
 
 module.exports = Authenticate;