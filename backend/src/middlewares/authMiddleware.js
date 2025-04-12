const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({ status: "Token not found, login again. "})
    }
    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next();
    }catch(error){
        console.log("Cookies:", req.cookies);
        return res.status(403).json({ status: "Token not found or expired." })
    }
}

module.exports = authMiddleware;