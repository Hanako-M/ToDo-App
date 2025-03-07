const User=require('../models/users.models.js');

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
const signUp= async(req,res)=>{
    const{username,email,password}=req.body;
    console.log(username,email,password);
    try{
      const user= await User.create({username,email,password})
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
        const user= await User.create({email,password})
      }
      catch(err){
  
      }
}

const signOut=async(req,res)=>{
    try{
        const user= await User.create({username,email,password})
      }
      catch(err){
  
      }
    }
module.exports={
signUp,
signIn,
signOut
}