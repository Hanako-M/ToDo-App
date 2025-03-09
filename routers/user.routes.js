const {Router} = require("express")
const router = Router()
const cont = require("../controllers/user.cont.js")
router.get("/get-todos",cont.getTodos)
router.get("/get-remain-todo",cont.get_remain_todo)

module.exports=router;
