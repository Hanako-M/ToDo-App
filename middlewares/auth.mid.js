const jwt=require('jsonwebtoken');

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
      next();
     }
    })
    }else{
        res.redirect('/signin');
    }
    
}
module.exports=checkAuth;
