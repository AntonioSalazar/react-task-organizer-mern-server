const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
//controller
const taskController = require('../controllers/taskController');

//create a task
// api/tasks
router.post("/", 
    auth,
    [
        check("name", "Task name is mandatory").not().isEmpty(),
        check("project", "project name is mandatory").not().isEmpty()
    ],      
    taskController.createTask
)

//get tasks per project 
router.get('/',
    auth,
    taskController.getTasks
)

//update a task
router.put('/:id',
    auth,
    taskController.uptadeTask
)

//delete a task
router.delete('/:id',
    auth,
    taskController.deleteTask
)

module.exports = router;