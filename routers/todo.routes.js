const {Router} = require("express")
const {checkUser}= require('../middlewares/auth.mid.js');
const controller = require('../controllers/todos.cont.js');
const router = Router()
router.post('/add-todo', checkUser,controller.addTodo);
router.put('/change-status/:id',checkUser,controller.changeStatus);
router.delete('/delete-todo/:id',checkUser, controller.deleteTodo);
router.get('/getbyid/:id', checkUser,controller.getbyid);


module.exports = router;