export class Project {
  private icon: string | null;
  private name: string | null;
  private todos: any[] | null;

  constructor(icon: string | null, name: string | null, todos: any[] | null) {
    this.icon = icon;
    this.name = name;
    this.todos = todos;
  }

  setIcon(icon: string | null): void {
    this.icon = icon;
  }

  setName(name: string | null): void {
    this.name = name;
  }

  setTodos(todos: any[] | null): void {
    this.todos = todos;
  }

  getIcon(): string | null {
    return this.icon;
  }

  getName(): string | null {
    return this.name;
  }

  getTodos(): any[] | null {
    return this.todos;
  }
}

export class ProjectBuilder {
  protected project: Project | null;

  constructor() {
    this.project = null;
  }

  getProject(): Project | null {
    return this.project;
  }

  createNewProject(): void {
    this.project = new Project(null, null, null);
  }

  buildIcon(): void {
    this.project?.setIcon(null);
  }

  buildName(): void {
    this.project?.setName(null);
  }

  buildTodos(): void {
    this.project?.setTodos(null);
  }
}

export class CarProjectBuilder extends ProjectBuilder {
  buildIcon() {
    this.project?.setIcon("🚗");
  }

  buildName() {
    this.project?.setName("car");
  }

  buildTodos() {
    this.project?.setTodos([]);
  }
}

export class OfficeProjectBuilder extends ProjectBuilder {
  buildIcon() {
    this.project?.setIcon("💻");
  }

  buildName() {
    this.project?.setName("office");
  }

  buildTodos() {
    this.project?.setTodos([]);
  }
}
