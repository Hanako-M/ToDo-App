const mongoose=require("mongoose")
const Schema=mongoose.Schema

const todoschema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    status:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})
const todos=mongoose.model('todos',todoschema)
module.exports=todos