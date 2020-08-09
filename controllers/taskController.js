const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require('express-validator')

//create a task
exports.createTask = async(req, res) => {
    //check if there are any errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    
    try {
        //extract the project
        const { project } = req.body;

        const projectExists = await Project.findById(project)
        if(!projectExists){
            return res.status(404).json({msg: 'project not found'})
        }
        //check if current project belongs to the authenticated user
        if(projectExists.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized to edit'})
        }

        //create the task
        const task = new Task(req.body)
        await task.save();
        res.json({task})

    } catch (error) {
        console.log(error);
        res.status(500).send("there was an error")
    }
}

//get project tasks
exports.getTasks = async( req, res ) => {

    try {
        //extract the project
        const { project } = req.query;


        const projectExists = await Project.findById(project)
        if(!projectExists){
            return res.status(404).json({msg: 'project not found'})
        }
        //check if current project belongs to the authenticated user
        if(projectExists.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }

        //get tasks by project
        const tasks = await Task.find({ project });
        res.json({tasks})
    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error")
    }
}

exports.uptadeTask = async (req, res) => {
    try {
        //extract the project
        const { project, name, state } = req.body;

        //check if the task exists or not
        let task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({msg: "Task doesnt exists"})
        }

        const projectExists = await Project.findById(project)

        //check if current project belongs to the authenticated user
        if(projectExists.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }
        
        //create an object with the new information
        const newTask = {}
       
            newTask.name = name;
        
        
            newTask.state = state
        

        //save new task
        task = await Task.findByIdAndUpdate({_id : req.params.id}, newTask, { new: true})
        res.json({task})
    } catch (error) {
        console.log(error);
        res.status(500).send('there was an error')
    }
}

exports.deleteTask = async (req, res) => {
    try {
        //extract the project
        const { project } = req.query;

        //check if the task exists or not
        let task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({msg: "Task doesnt exists"})
        }

        const projectExists = await Project.findById(project)

        //check if current project belongs to the authenticated user
        if(projectExists.author.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not authorized'})
        }
        
        //delete task
        await Task.findOneAndRemove({_id: req.params.id})
        res.json({msg: "task has been deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).send('there was an error')
    }
}