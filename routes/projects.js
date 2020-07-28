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

//get all the projects
router.get("/",
    auth,
    projectController.getProjects    
)


//updates project by ID
router.put('/:id',
    auth,
    [
        check('name', 'Project name is mandatory').not().isEmpty()
    ],  
    projectController.updateProject
)

//delete a project
router.delete('/:id',
    auth,
    projectController.deleteProject
)


module.exports = router;