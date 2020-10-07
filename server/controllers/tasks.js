const Data = require("../models/Data");

module.exports.task = (req, res) => {
    return res.json("Hi");
};

module.exports.getUserData = async (req, res) => {};

module.exports.addTodo = async (req, res) => {};
module.exports.editTodo = async (req, res) => {};
module.exports.removeTodo = async (req, res) => {};

module.exports.addProject = async (req, res) => {
    // get project icon and name
    const { icon, name } = req.body;

    if (!icon || !name) {
        return res.status(400).json("Invalid data");
    }

    // get user id
    const { id } = req.user;

    // find data for user with given id
    try {
        const data = await Data.findOne({
            user: id,
        });

        // check if the project with given name does not exist
        const project = data.projects.find((project) => project.name === name);

        // check if project exists
        if (project) {
            return res.status(400).json("Project exists");
        }

        // add project
        data.projects.push({
            icon,
            name,
            todos: [],
        });

        // save project
        data.save();

        return res.status(200).json("Project added");
    } catch (err) {
        console.log(err);
        return res.status(500).json("Something went wrong");
    }
};

module.exports.removeProject = async (req, res) => {
    // get project name
    const { name } = req.body;

    if (!name) {
        return res.status(400).json("Invalid data");
    }

    // get user id
    const { id } = req.user;

    // find data for user with given id
    try {
        const data = await Data.findOne({
            user: id,
        });

        // check if the project with given name does not exist
        const project = data.projects.find((project) => project.name === name);

        if (!project) {
            return res.status(400).json("Project does not exist");
        }

        const index = data.projects.indexOf(project);
        data.projects.splice(index, 1);

        data.save();

        return res.status(200).json("Project removed");
    } catch (err) {
        console.log(err);
        return res.status(500).json("Something went wrong");
    }
};
