import jwt from "jsonwebtoken"

 const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next){
   
    const header = req.header("authorization");

    try {
        const response = jwt.verify(header, JWT_SECRET);
        req.userId = response.id;
        next();

    } catch (error) {
        res.status(403).json({
            message: "You are not logged In"
        })
    }
    
}