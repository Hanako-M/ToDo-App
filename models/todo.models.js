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
        type:boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})
const todos=mongoose.model('todos',todoshema)
module.exports={todos}