const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.header.Authorization
    if(!token){
        return res.status(401).json({message:"No token,authorization denied"})
    }
    try{
        const token = req.headers.authorization.replace("Bearer ", "");
        const decodeduser = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decodeduser
        next()
    }catch(err){
        res.status(401).json({message:"Token is not valid"})
    }
}

module.exports = auth