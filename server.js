const express=require("express")
const dotenv=require("dotenv")
let connectDB=require("./config/connectDB.js")
const app=express()
const port=3000

dotenv.config();//load env variables
app.listen(port,async()=>{
    try{
       await connectDB()
        console.log(`server is running successfully, Hana!`)
    }catch(err){
        console.log(`server is not running, Hana!`)
        console.error(err)
    }
    
})