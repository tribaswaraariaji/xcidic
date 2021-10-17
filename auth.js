const User = require("../backend/models/userModel");
const {verifyToken} = require("../backend/verifyJWT");

const Authentication = (req,res,next) => {
    let token = req.headers.jwttoken ? req.headers.jwttoken : null
    if(token){
        verifyToken(token,async(err,decoded)=> {
            if(err){
                next({ message : `Anda harus login terlebih dahulu!`})
            }else if(decoded){
                let user = await User.findOne({_id: decoded.id})
                if(!user){
                    res.status(401).json({message:"Not Authorized!"})
                }else{
                    req.decoded = decoded;
                    next();
                }
            }
        })
    }else{
        return res.status(403).json({ message: "Anda harus login terlebih dahulu!" });
    }
}

const AuthenticationEmployee = (req,res,next) => {
    let token = req.headers.jwttoken ? req.headers.jwttoken : null
    if(token){
        verifyToken(token,async(err,decoded)=> {
            if(err){
                console.log("wew")
                next({ message : "Anda harus login terlebih dahulu!"})
            }else if(decoded){
                let user = await User.findOne({_id: decoded.id})
                let level = (user.role === "employee")
                if(!user){
                    res.status(401).json({message:"Not Authorized!"})
                }else if(!level){
                    res.status(401).json({message:"Role Not Authorized"});
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            }else{
                res.status(400).json({message:"Not Authorized!"})
            }
        })
    }
}

const AuthenticationManager = (req,res,next) => {
    let token = req.headers.jwttoken ? req.headers.jwttoken : null
    if(token){
        verifyToken(token,async(err,decoded)=> {
           if(decoded){
                let user = await User.findOne({_id: decoded.id})
                let level = (user.role === "manager")
                if(!user){
                    res.status(401).json({message:"Not Authorized!"})
                }else if(!level){
                    res.status(401).json({message:"Role Not Authorized"});
                }else if(token == null){
                    res.status(401).json({message:"Token empty"});
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            }else{
                res.status(400).json({message:"Not Authorized!"})
            }
        })
    }
}

module.exports = {
    Authentication,
    AuthenticationEmployee,
    AuthenticationManager
}