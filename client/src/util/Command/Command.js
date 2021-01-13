"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CommandControl = exports.RemoveTodoCommand = exports.EditTodoCommand = exports.AddTodoCommand = exports.Menu = void 0;
var axios_1 = require("axios");
var Menu = /** @class */ (function () {
    function Menu(project, data, setData, newTodo, oldTodo) {
        this.project = project;
        this.data = data;
        this.setData = setData;
        this.newTodo = newTodo;
        this.oldTodo = oldTodo;
    }
    Menu.prototype.addTodo = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
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
                axios_1["default"]
                    .post("http://192.168.0.185:7000/api/task/add-todo", __assign({ name: this.project }, this.newTodo))
                    .then(function (res) {
                    resolve();
                    _this.setData(function (prevData) {
                        var newData = [];
                        prevData.forEach(function (data) {
                            newData.push({
                                name: data.name,
                                icon: data.icon,
                                todos: data.todos ? __spreadArrays(data.todos) : []
                            });
                        });
                        newData[_this.findProjectIndex()].todos.push(_this.newTodo);
                        return newData;
                    });
                })["catch"](function (err) {
                    resolve();
                    console.error(err);
                });
                return [2 /*return*/];
            });
        }); });
    };
    Menu.prototype.editTodo = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
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
                axios_1["default"]
                    .put("http://192.168.0.185:7000/api/task/edit-todo", {
                    name: this.project,
                    index: this.oldTodo.tableData.id.toString(),
                    task: this.newTodo.task,
                    time: this.newTodo.time,
                    date: this.newTodo.date
                })
                    .then(function (res) {
                    resolve();
                    if (_this.oldTodo) {
                        _this.setData(function (prevData) {
                            var newData = [];
                            prevData.forEach(function (data) {
                                newData.push({
                                    name: data.name,
                                    icon: data.icon,
                                    todos: __spreadArrays(data.todos)
                                });
                            });
                            var i = _this.findProjectIndex();
                            newData[i].todos[newData[i].todos.indexOf(_this.oldTodo)] = _this.newTodo;
                            return newData;
                        });
                    }
                })["catch"](function (err) {
                    resolve();
                    console.error(err);
                });
                return [2 /*return*/];
            });
        }); });
    };
    Menu.prototype.removeTodo = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                axios_1["default"]
                    .post("http://192.168.0.185:7000/api/task/remove-todo", {
                    name: this.project,
                    index: this.oldTodo.tableData.id.toString()
                })
                    .then(function (res) {
                    resolve();
                    _this.setData(function (prevData) {
                        var newData = [];
                        prevData.forEach(function (data) {
                            newData.push({
                                name: data.name,
                                icon: data.icon,
                                todos: __spreadArrays(data.todos)
                            });
                        });
                        var i = _this.findProjectIndex();
                        newData[i].todos.splice(newData[i].todos.indexOf(_this.oldTodo), 1);
                        return newData;
                    });
                })["catch"](function (err) {
                    resolve();
                    console.error(err);
                });
                return [2 /*return*/];
            });
        }); });
    };
    Menu.prototype.findProjectIndex = function () {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].name === this.project) {
                return i;
            }
        }
        return -1;
    };
    return Menu;
}());
exports.Menu = Menu;
var AddTodoCommand = /** @class */ (function () {
    function AddTodoCommand(menu) {
        this.menu = menu;
    }
    AddTodoCommand.prototype.execute = function () {
        return this.menu.addTodo();
    };
    return AddTodoCommand;
}());
exports.AddTodoCommand = AddTodoCommand;
var EditTodoCommand = /** @class */ (function () {
    function EditTodoCommand(menu) {
        this.menu = menu;
    }
    EditTodoCommand.prototype.execute = function () {
        return this.menu.editTodo();
    };
    return EditTodoCommand;
}());
exports.EditTodoCommand = EditTodoCommand;
var RemoveTodoCommand = /** @class */ (function () {
    function RemoveTodoCommand(menu) {
        this.menu = menu;
    }
    RemoveTodoCommand.prototype.execute = function () {
        return this.menu.removeTodo();
    };
    return RemoveTodoCommand;
}());
exports.RemoveTodoCommand = RemoveTodoCommand;
var CommandControl = /** @class */ (function () {
    function CommandControl(command) {
        this.command = command;
    }
    CommandControl.prototype.setCommand = function (command) {
        this.command = command;
    };
    CommandControl.prototype.execute = function () {
        return this.command.execute();
    };
    return CommandControl;
}());
exports.CommandControl = CommandControl;
