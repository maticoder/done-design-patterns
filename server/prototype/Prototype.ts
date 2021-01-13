class ProjectObject {
    private id: String;
    protected type: String;

    public icon: String;
    public name: String;
    public todos: any[];

    public getType(): String {
        return this.type;
    }

    public getId(): String {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public setType(type: String): void {
        this.type = type;
    }

    public clone(): ProjectObject {
        let project: ProjectObject = new ProjectObject();

        project.icon = this.icon;
        project.name = this.name;
        project.todos = this.todos;

        return project;
    }
}

class HomeProject extends ProjectObject {
    public constructor() {
        super();
        this.type = "home";
        this.icon = "🏠";
        this.name = "home";
        this.todos = [];
    }
}

class FoodProject extends ProjectObject {
    public constructor() {
        super();
        this.type = "food";
        this.icon = "🍗";
        this.name = "food";
        this.todos = [];
    }
}

class BuyProject extends ProjectObject {
    public constructor() {
        super();
        this.type = "buy";
        this.icon = "🛒";
        this.name = "buy";
        this.todos = [];
    }
}

export class ProjectCache {
    static projectMap: Map<String, ProjectObject> = new Map<
        String,
        ProjectObject
    >();

    public static getProject(projectId: String): ProjectObject {
        let cachedProject: ProjectObject = this.projectMap.get(projectId);
        return cachedProject.clone();
    }

    public static loadCache(): void {
        let homeProject: HomeProject = new HomeProject();
        homeProject.setId("1");
        this.projectMap.set(homeProject.getId(), homeProject);

        let foodProject: FoodProject = new FoodProject();
        foodProject.setId("2");
        this.projectMap.set(foodProject.getId(), foodProject);

        let buyProject: BuyProject = new BuyProject();
        buyProject.setId("3");
        this.projectMap.set(buyProject.getId(), buyProject);
    }
}
