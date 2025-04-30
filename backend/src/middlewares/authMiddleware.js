const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoder = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoder;
        next();
    } catch (error) {
        console.error("JWT Error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }

}

module.exports = authMiddleware;