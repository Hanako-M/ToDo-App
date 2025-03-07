const express=require("express")
const dotenv=require("dotenv")
let connectDB=require("./config/connectDB.js")
let todos=require("./models/todo.models.js")
let users=require("./models/users.models.js")
const auth_router = require("./routers/auth.routes.js")
const mongoose=require("mongoose")
const app=express()
const port=3000

dotenv.config();//load env variables


//middlewares 
app.use(express.json())



app.listen(port,async()=>{
    try{
       await connectDB();
        // const newTodo = new todos({
        //     title: "Learn Node.js",
        //     description: "Build a CRUD API",
        //     status: false,
        //     userId: new mongoose.Types.ObjectId()  // Dummy ObjectId for testing
        // });
      
        // newTodo.save()
        //     .then(() => console.log("Todo saved!"))
        //     .catch(err => console.log("Error:", err));
       app.use("/",auth_router);
   
       console.log(`server is running successfully, Hana!`)
    
    }catch(err){
        console.log(`ERROR`)
        console.error(err)
    }
    
})