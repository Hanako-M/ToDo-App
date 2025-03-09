const {Router} = require("express")
const checkAuth= require('../middlewares/auth.mid.js');
const controller = require('../controllers/todos.cont.js');
const router = Router()
router.post('/add-todo',checkAuth,controller.addTodo);
router.put('/change-status/:id',checkAuth,controller.changeStatus);
router.delete('/delete-todo/:id', checkAuth,controller.deleteTodo);
router.get('/getbyid/:id', checkAuth,controller.getbyid);


module.exports = router;