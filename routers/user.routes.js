const {Router} = require("express")
const {checkUser}= require('../middlewares/auth.mid.js');
const router = Router()
const cont = require("../controllers/users.cont.js")
router.get("/get-todos",checkUser,cont.getTodos)
router.get("/get-remain-todo",checkUser,cont.get_remain_todo)

module.exports=router;
