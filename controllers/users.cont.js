const express=require("express");
const Users = require("../models/users.models.js");
const todos = require("../models/todo.models.js");
const getTodos=async(req,res)=>{
   const userid=req.params.id;
   const user=await Users.findById(userid).populate("todos").select("todos");
   if(!user){
       return res.status(404).send("User not found")
   }
   res.status(200).send({
    success:true,
    todos:[...user.todos]
   });
}

const get_remain_todo=async(req,res)=>{
    const userid=req.params.id;
    const user=await users.findById(userid).populate('todos').select('todos');
    if(!user){
        return res.status(404).send("User not found")
    }
    const remain=user.todos.filter(todo=>todo.status===false);
   res.status(200).send({
    success:true,
    remaining_todos:[...remain]
   })
}

module.exports={
    getTodos,
    get_remain_todo
}