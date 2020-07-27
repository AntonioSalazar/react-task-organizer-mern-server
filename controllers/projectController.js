const Project = require('../models/Project');
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {

    //check if there are any errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }


    try {

        //create a new project
        const project = new Project(req.body)

        //Add the author via JWT
        project.author = req.user.id;

        //save the project
        project.save()
        res.json(project)
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error')
    }
}