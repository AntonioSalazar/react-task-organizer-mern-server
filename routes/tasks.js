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
        check("name", "Task name is mandatory").not().isEmpty()
    ],      
    taskController.createTask
)

module.exports = router;