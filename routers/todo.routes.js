const {Router} = require('express');
const router = Router();
//const controller = require('../controller/todo.controller');

router.post('/add-todo', controller.addTodo);
router.put('/change-status/:id', controller.changeStatus);
router.delete('/delete-todo/:id', controller.deleteTodo);
router.get('/getbyid/:id', controller.getbyid);
router.get('/get-todos', controller.getTodos);
router.get('/get-remain-todo', controller.get_remain_todo);

module.exports = router;