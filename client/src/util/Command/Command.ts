import axios from "axios";

interface ICommand {
  execute(): any;
}

export class Menu {
  public project: any;
  public data: any;
  public setData: any;
  public newTodo: any;
  public oldTodo: any;

  public constructor(
    project: any,
    data: any,
    setData: any,
    newTodo: any,
    oldTodo: any
  ) {
    this.project = project;
    this.data = data;
    this.setData = setData;
    this.newTodo = newTodo;
    this.oldTodo = oldTodo;
  }

  public addTodo(): any {
    return new Promise(async (resolve) => {
      this.newTodo.task =
        this.newTodo.task && this.newTodo.task !== ""
          ? this.newTodo.task
          : "nothing? 😠";
      this.newTodo.time =
        this.newTodo.time && this.newTodo.time !== ""
          ? this.newTodo.time
          : new Date().toISOString();
      this.newTodo.date =
        this.newTodo.date && this.newTodo.date !== ""
          ? this.newTodo.date
          : new Date().toISOString();

      axios
        .post("http://192.168.0.185:7000/api/task/add-todo", {
          name: this.project,
          ...this.newTodo,
        })
        .then((res) => {
          resolve();
          this.setData((prevData: any) => {
            let newData: any[] = [];
            prevData.forEach((data: any) => {
              newData.push({
                name: data.name,
                icon: data.icon,
                todos: data.todos ? [...data.todos] : [],
              });
            });
            newData[this.findProjectIndex()].todos.push(this.newTodo);
            return newData;
          });
        })
        .catch((err) => {
          resolve();
          console.error(err);
        });
    });
  }

  public editTodo(): any {
    return new Promise(async (resolve) => {
      this.newTodo.task =
        this.newTodo.task && this.newTodo.task !== ""
          ? this.newTodo.task
          : "nothing? 😠";
      this.newTodo.time =
        this.newTodo.time && this.newTodo.time !== ""
          ? this.newTodo.time
          : new Date().toISOString();
      this.newTodo.date =
        this.newTodo.date && this.newTodo.date !== ""
          ? this.newTodo.date
          : new Date().toISOString();

      axios
        .put("http://192.168.0.185:7000/api/task/edit-todo", {
          name: this.project,
          index: this.oldTodo.tableData.id.toString(),
          task: this.newTodo.task,
          time: this.newTodo.time,
          date: this.newTodo.date,
        })
        .then((res) => {
          resolve();
          if (this.oldTodo) {
            this.setData((prevData: any) => {
              let newData: any[] = [];
              prevData.forEach((data: any) => {
                newData.push({
                  name: data.name,
                  icon: data.icon,
                  todos: [...data.todos],
                });
              });
              let i = this.findProjectIndex();
              newData[i].todos[
                newData[i].todos.indexOf(this.oldTodo)
              ] = this.newTodo;
              return newData;
            });
          }
        })
        .catch((err) => {
          resolve();
          console.error(err);
        });
    });
  }

  public removeTodo(): any {
    return new Promise(async (resolve) => {
      axios
        .post("http://192.168.0.185:7000/api/task/remove-todo", {
          name: this.project,
          index: this.oldTodo.tableData.id.toString(),
        })
        .then((res) => {
          resolve();
          this.setData((prevData: any) => {
            let newData: any[] = [];
            prevData.forEach((data: any) => {
              newData.push({
                name: data.name,
                icon: data.icon,
                todos: [...data.todos],
              });
            });
            let i = this.findProjectIndex();
            newData[i].todos.splice(newData[i].todos.indexOf(this.oldTodo), 1);
            return newData;
          });
        })
        .catch((err) => {
          resolve();
          console.error(err);
        });
    });
  }

  public findProjectIndex(): number {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].name === this.project) {
        return i;
      }
    }
    return -1;
  }
}

export class AddTodoCommand implements ICommand {
  private menu: Menu;

  public constructor(menu: Menu) {
    this.menu = menu;
  }

  execute(): any {
    return this.menu.addTodo();
  }
}

export class EditTodoCommand implements ICommand {
  private menu: Menu;

  public constructor(menu: Menu) {
    this.menu = menu;
  }

  execute(): any {
    return this.menu.editTodo();
  }
}

export class RemoveTodoCommand implements ICommand {
  private menu: Menu;

  public constructor(menu: Menu) {
    this.menu = menu;
  }

  execute(): any {
    return this.menu.removeTodo();
  }
}

export class CommandControl {
  public command: ICommand;

  public constructor(command: ICommand) {
    this.command = command;
  }

  public setCommand(command: ICommand): void {
    this.command = command;
  }

  public execute(): any {
    return this.command.execute();
  }
}
