const express = require('express');
const User=require('../models/users.models.js');
const todos=require('../models/todo.models.js');
const addTodo = async (req, res) => {
    const { title, description, status } = req.body;
    console.log("console.log() req.user", req.user);
    const user = req.user;
    
    if (!user) {
        console.log("console.error() User not found");
        
        return res.status(404).send("User not found");
    }

    const newTodo = new todos({
        title,
        description,
        status,
        userId: user._id,
    });
    if (!user.todos) {
        user.todos = [];
      }
    await newTodo.save();
    user.todos.push(newTodo._id);
    await user.save();

    res.status(201).send({
        success: true,
        message: "Todo added successfully",
        todo: newTodo,
    });
};

const changeStatus=async(req,res)=>{
    const {id}=req.params;
    const user=req.user;
    const todo=await todos.findById(id);
    if(!todo){
        return res.status(404).send("Todo not found")
    }       
    // if(todo.userId.toString()!==user._id.toString()){
    //     return res.status(401).send("You are not authorized to perform this action")
    // }
    todo.status=!todo.status;
    await todo.save();
    res.status(200).send({
        success:true,
        message:"Todo status updated successfully"
    })
    
}
const deleteTodo=async(req,res)=>{
    const {id}=req.params;
    const user=req.user;
    const todo=await todos.findById(id);
    if(!todo){
        return res.status(404).send("Todo not found")
    }
    // if(todo.userId.toString()!==user._id.toString()){
    //     return res.status(401).send("You are not authorized to perform this action")
    // }
    await todos.deleteOne(todo);
    res.status(200).send({
        success:true,
        message:"Todo deleted successfully"
    })
}
const getbyid = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await todos.findOne({ id });
      if(todo.userId!=req.userId){
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized - Access denied" });
      }
  
      res.json({ success: true, todo });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  

module.exports= {
    addTodo,
    deleteTodo,
    getbyid,
    changeStatus
}