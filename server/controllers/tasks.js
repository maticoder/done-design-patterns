const Data = require("../models/Data");
const Project = require("../models/Project");

module.exports.task = (req, res) => {
    return res.json("Hi");
};

module.exports.getUserData = async (req, res) => {};

module.exports.addTodo = async (req, res) => {
    const { name, task, time, date } = req.body;

    if (!name || !task || !time || !date) {
        return res.status(400).json("Invalid data");
    }

    const { id } = req.user;

    try {
        const data = await Data.findOne({
            user: id,
        });

        const project = data.projects.find((project) => project.name === name);

        if (!project) {
            return res.status(400).json("Project does not exist");
        }

        const index = data.projects.indexOf(project);
        data.projects[index].todos.push({
            task,
            time,
            date,
        });
        console.log(data.projects[index]);

        Data.data.save();

        return res.status(200).json("Todo added");
    } catch (err) {
        console.log(err);
        return res.status(500).json("Something went wrong");
    }
};
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
        data.populate({
            path: "projects",
            match: { name: name },
        }).execPopulate(async (err, result) => {
            if (result.projects.length != 0) {
                // project exists
                return res.status(400).json("Project exists");
            } else {
                // add project
                const project = await Project.create({
                    icon,
                    name,
                    todos: [],
                });
                data.projects.push(project.id);

                // save project
                data.save();

                return res.status(200).json("Project added");
            }
        });
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

        // check if the project with given name does exist
        data.populate({
            path: "projects",
        }).execPopulate(async (err, result) => {
            if (result.projects.length == 0) {
                return res.status(400).json("Project does not exist");
            } else {
                // find project
                const project = data.projects.find(
                    (project) => project.name === name
                );

                // find project index
                const index = data.projects.indexOf(project);

                // check if project exists
                if (index == -1) {
                    return res.status(400).json("Project does not exist");
                }

                // remove project
                data.projects.splice(index, 1);
                await Project.findOneAndRemove({
                    name,
                });

                // save data
                data.save();

                // return response
                return res.status(200).json("Project removed");
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json("Something went wrong");
    }
};
