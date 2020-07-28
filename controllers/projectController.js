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

//get all the projects of current user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({author: req.user.id});
        res.json({projects})
    } catch (error) {
        console.log(error);
        res.status(500).send('there was an error')
    }
}

//Updates a project
exports.updateProject = async (req, res) => {
    //check if there are any errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //get the project info
    const { name } = req.body;
    const newProject = {};
    
    if(name){
        newProject.name = name;
    }

    try {
        //check the id

        let project = await Project.findById(req.params.id);
        //if project exists or not
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        }
        //verify project author
        if(project.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized to edit'})
        }

        //update
        project = await Project.findByIdAndUpdate({_id: req.params.id}, { $set: newProject}, {new: true})
        res.json({project})

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
}

//deletes a project by its id
exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        //if project exists or not
        if(!project){
            return res.status(404).json({msg: 'Project not found'})
        }
        //verify project author
        if(project.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized to edit'})
        }
        //delete project
        await Project.findOneAndRemove({_id : req.params.id});
        res.json({msg: "Project has been deleted"})

    } catch (error) {
        console.log(error);
        res.status(500).send("Server error")
    }
}