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
exports.ProjectCache = void 0;
var ProjectObject = /** @class */ (function () {
    function ProjectObject() {
    }
    ProjectObject.prototype.getType = function () {
        return this.type;
    };
    ProjectObject.prototype.getId = function () {
        return this.id;
    };
    ProjectObject.prototype.setId = function (id) {
        this.id = id;
    };
    ProjectObject.prototype.setType = function (type) {
        this.type = type;
    };
    ProjectObject.prototype.clone = function () {
        var project = new ProjectObject();
        project.icon = this.icon;
        project.name = this.name;
        project.todos = this.todos;
        return project;
    };
    return ProjectObject;
}());
var HomeProject = /** @class */ (function (_super) {
    __extends(HomeProject, _super);
    function HomeProject() {
        var _this = _super.call(this) || this;
        _this.type = "home";
        _this.icon = "🏠";
        _this.name = "home";
        _this.todos = [];
        return _this;
    }
    return HomeProject;
}(ProjectObject));
var FoodProject = /** @class */ (function (_super) {
    __extends(FoodProject, _super);
    function FoodProject() {
        var _this = _super.call(this) || this;
        _this.type = "food";
        _this.icon = "🍗";
        _this.name = "food";
        _this.todos = [];
        return _this;
    }
    return FoodProject;
}(ProjectObject));
var BuyProject = /** @class */ (function (_super) {
    __extends(BuyProject, _super);
    function BuyProject() {
        var _this = _super.call(this) || this;
        _this.type = "buy";
        _this.icon = "🛒";
        _this.name = "buy";
        _this.todos = [];
        return _this;
    }
    return BuyProject;
}(ProjectObject));
var ProjectCache = /** @class */ (function () {
    function ProjectCache() {
    }
    ProjectCache.getProject = function (projectId) {
        var cachedProject = this.projectMap.get(projectId);
        return cachedProject.clone();
    };
    ProjectCache.loadCache = function () {
        var homeProject = new HomeProject();
        homeProject.setId("1");
        this.projectMap.set(homeProject.getId(), homeProject);
        var foodProject = new FoodProject();
        foodProject.setId("2");
        this.projectMap.set(foodProject.getId(), foodProject);
        var buyProject = new BuyProject();
        buyProject.setId("3");
        this.projectMap.set(buyProject.getId(), buyProject);
    };
    ProjectCache.projectMap = new Map();
    return ProjectCache;
}());
exports.ProjectCache = ProjectCache;
