const Project = require("../models/Project");

class CreateProject {
    public data: any;

    constructor(data: any) {
        this.data = data;
    }

    async create(project: any) {
        const proj = await Project.create(project);
        this.data.projects.push(proj.id);
        return this;
    }
}

module.exports = CreateProject;
