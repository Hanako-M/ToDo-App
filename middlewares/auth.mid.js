const jwt=require('jsonwebtoken');
//const users=require('../models/User');
const checkAuth=(req,res,next)=>{

    const token=req.cookies.jwt;  //get the token from the cookies

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

    if (!token) {
        req.user = null;
        res.locals.user = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

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

module.exports = { checkUser ,checkAuth};
