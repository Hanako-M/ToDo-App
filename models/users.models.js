const mongoose =require("mongoose")
const Schema=mongoose.Schema
const userschema=new Schema({
    username:{type:String,required:true},
    email:{type:stringify,required:true},
    password:{type:String,required:true},
    todos:[{
        type:Schema.Types.ObjectId,
        ref:'todos'
    }]
})
const users=mongoose.model('users',userschema)
module.exports={users};