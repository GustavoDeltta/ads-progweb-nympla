function roleMiddleware(roleAccess){
    return (req, res, next) => {
        if(req.user.userRole != roleAccess){
            return res.status(403).json({ error:"Acess Denied" });
        }
        next();
    }
}

module.exports = roleMiddleware;