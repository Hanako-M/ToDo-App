const express=require("express")
const router=express.Router

router.get("/get-todos",cont.getTodos)
router.get("/get-remain-todo",cont.get_remain_todo)

module.exports=router;
