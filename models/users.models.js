const mongoose =require("mongoose")
const Schema=mongoose.Schema
const bcrypt=require("bcrypt")
const {isEmail}=require("validator")

const userschema=new Schema({
    username:{type:String,required:[true,'username is required'],unique:[true,'username already exists']},
    email:{type:String,required:[true,'an email is required'],unique:[true,'email already exists'],validate:[isEmail,'please enter a valid email']},
    password:{type:String,required:[true,'please enter your password'],minlength:[6,'min password length is 6 characters']},
    todos:[{
        type:Schema.Types.ObjectId,
        ref:'todos'
    }]
})

userschema.pre('save',function(next){
    //const salt=bcrypt.genSalt();//salt to put in the begining of the password
    this.password=bcrypt.hashSync(this.password,10);//hash the password + the salt
    next();
})
const users=mongoose.model('users',userschema)
module.exports=users;