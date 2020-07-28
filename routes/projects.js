const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
//controller
const projectController = require('../controllers/projectController');


//Create projects
//api/projects

router.post("/",
    auth,
    [
        check('name', 'Project name is mandatory').not().isEmpty()
    ],  
    projectController.createProject    
)

router.get("/",
    auth,
    projectController.getProjects    
)

module.exports = router;