const express = require('express');
const router = express.Router();

//controller
const projectController = require('../controllers/projectController');

const auth = require('../middleware/auth');

//Create projects
//api/projects

router.post("/",
    auth,
    projectController.createProject    
)

router.get("/",
    auth,
    projectController.createProject    
)

module.exports = router;