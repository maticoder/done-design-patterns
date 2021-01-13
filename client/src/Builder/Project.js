"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.OfficeProjectBuilder = exports.CarProjectBuilder = exports.ProjectBuilder = exports.Project = void 0;
var Project = /** @class */ (function () {
    function Project(icon, name, todos) {
        this.icon = icon;
        this.name = name;
        this.todos = todos;
    }
    Project.prototype.setIcon = function (icon) {
        this.icon = icon;
    };
    Project.prototype.setName = function (name) {
        this.name = name;
    };
    Project.prototype.setTodos = function (todos) {
        this.todos = todos;
    };
    Project.prototype.getIcon = function () {
        return this.icon;
    };
    Project.prototype.getName = function () {
        return this.name;
    };
    Project.prototype.getTodos = function () {
        return this.todos;
    };
    return Project;
}());
exports.Project = Project;
var ProjectBuilder = /** @class */ (function () {
    function ProjectBuilder() {
        this.project = null;
    }
    ProjectBuilder.prototype.getProject = function () {
        return this.project;
    };
    ProjectBuilder.prototype.createNewProject = function () {
        this.project = new Project(null, null, null);
    };
    ProjectBuilder.prototype.buildIcon = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setIcon(null);
    };
    ProjectBuilder.prototype.buildName = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setName(null);
    };
    ProjectBuilder.prototype.buildTodos = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setTodos(null);
    };
    return ProjectBuilder;
}());
exports.ProjectBuilder = ProjectBuilder;
var CarProjectBuilder = /** @class */ (function (_super) {
    __extends(CarProjectBuilder, _super);
    function CarProjectBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarProjectBuilder.prototype.buildIcon = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setIcon("🚗");
    };
    CarProjectBuilder.prototype.buildName = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setName("car");
    };
    CarProjectBuilder.prototype.buildTodos = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setTodos([]);
    };
    return CarProjectBuilder;
}(ProjectBuilder));
exports.CarProjectBuilder = CarProjectBuilder;
var OfficeProjectBuilder = /** @class */ (function (_super) {
    __extends(OfficeProjectBuilder, _super);
    function OfficeProjectBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OfficeProjectBuilder.prototype.buildIcon = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setIcon("💻");
    };
    OfficeProjectBuilder.prototype.buildName = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setName("office");
    };
    OfficeProjectBuilder.prototype.buildTodos = function () {
        var _a;
        (_a = this.project) === null || _a === void 0 ? void 0 : _a.setTodos([]);
    };
    return OfficeProjectBuilder;
}(ProjectBuilder));
exports.OfficeProjectBuilder = OfficeProjectBuilder;
