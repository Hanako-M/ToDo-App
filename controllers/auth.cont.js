const User=require('../models/users.models.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

//handling errors
const handleErrors=(err)=>{
    console.log(err.message,err.code);
let error = {};

//validate errors
if(err.message.includes('users validation failed')){
    //console.log(Object.values(err.error));
Object.values(err.errors).forEach(({properties})=>{
    error[properties.path]=properties.message;})
}
return error;
}

//creating tokens
const createtoken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:60*60*24}/*1 day*/);
}

const signUp= async(req,res)=>{
    const{username,email,password}=req.body;
    console.log(username,email,password);
    try{
      const user= await User.create({username,email,password});
      const token=createtoken(user._id);
      res.cookie('jwt',token,{httpOnly:true,maxAge:60*60*24*1000});
    //   res.send({token});
    }
    catch(err){
        const errors=handleErrors(err);
        res.json({errors});
    }
    res.send({
        "success": true,
        "message": "User registered successfully"
      });
     
}

const signIn=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const found=  await User.findOne({email});
        if(found){
         const auth = bcrypt.compareSync(password, found.password);
         if(auth){
            const token=createtoken(found._id);
            res.cookie('jwt',token,{httpOnly:true,maxAge:60*60*24*1000});
            res.status(200).send({
              "success": true,
              "user":{
                "id":found._id,
                "username":found.username,
                "email":found.email
             }
          })
         }else{
            res.status(406).send({
                "success": false,
                "message": "incorrect email/password"
            })
         }
        }else{
            res.status(406).send({
                "success": false,
                "message": "User not found or incorrect email/password"
            })
        }
        
      }
      catch(err){
        const errors=handleErrors(err);
        res.json({errors});
        res.send({
            "success": false,
            "message": "User not found or incorrect email/password"
        })
      }
}

const signOut=async(req,res)=>{
  try{   
    res.cookie('jwt','',{maxAge:2}); //now take the cookie as a response and set it to empty
    res.status(200).send({
      "success": true,
      "message": "User signed out successfully"
    })
  }catch(err){
    res.status(406).send({
      "success": false,
      "message": "an error occured"
    })
  }
  }


module.exports={
signUp,
signIn,
signOut
}