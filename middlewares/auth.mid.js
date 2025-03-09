const jwt=require("jsonwebtoken");
const Users=require('../models/users.models.js');
const checkAuth=(req,res,next)=>{

    const token=req.cookies.token;  //get the token from the cookies

    //check the token exists and is verified
    if (token){
    jwt.verify(token,process.env.JWT_SECRET,(err,decodedtoken)=>{
     if(err){
        console.log(err.message);
        res.redirect('/signin');
     }else{
         console.log('perfect you are all good to go!!',decodedtoken);
         req.userId=decodedtoken.id;
         req.user = user;
      next();
     }
    })
    }else{
        res.redirect('/signin');
    }
    
}

//check current user
// const jwt = require("jsonwebtoken");
// const User = require("../models/User"); // Ensure correct path

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req.cookies.jwt,"ya hana this is the token");
    if (!token) {
        req.user = null;
        res.locals.user = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findById(decodedToken.id);

        if (!user) {
            req.user = null;
            res.locals.user = null;
            return next();
        }

        req.user = user; // Attach user to request for controller use
        res.locals.user = user; // Attach user to response locals (optional)
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        req.user = null;
        res.locals.user = null;
        next();
    }
};

module.exports = { checkAuth ,checkUser};
