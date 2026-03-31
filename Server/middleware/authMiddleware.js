const jwt = require('jsonwebtoken');

exports.protect = (req,res,next) => {
    const authHeader = req.headers.authorization;

    //check if token is in headers
    if (!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(404).json({message: "Access Denied! No token provided"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next(); //req context
    } catch (error) {
        res.status(401).json({message: "Invalid or expired token"})
    }
}