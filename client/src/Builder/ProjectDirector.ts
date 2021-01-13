import { Project, ProjectBuilder } from "./Project";

class ProjectDirector {
  private projectBuilder: ProjectBuilder | null;

  constructor() {
    this.projectBuilder = null;
  }

  public setProjectBuilder(projectBuilder: ProjectBuilder | null) {
    this.projectBuilder = projectBuilder;
  }

  public getProject(): any {
    return this.projectBuilder?.getProject();
  }

  public constructProject() {
    this.projectBuilder?.createNewProject();
    this.projectBuilder?.buildIcon();
    this.projectBuilder?.buildName();
    this.projectBuilder?.buildTodos();
  }
}

export default ProjectDirector;
