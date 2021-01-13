"use strict";
exports.__esModule = true;
var ProjectDirector = /** @class */ (function () {
    function ProjectDirector() {
        this.projectBuilder = null;
    }
    ProjectDirector.prototype.setProjectBuilder = function (projectBuilder) {
        this.projectBuilder = projectBuilder;
    };
    ProjectDirector.prototype.getProject = function () {
        var _a;
        return (_a = this.projectBuilder) === null || _a === void 0 ? void 0 : _a.getProject();
    };
    ProjectDirector.prototype.constructProject = function () {
        var _a, _b, _c, _d;
        (_a = this.projectBuilder) === null || _a === void 0 ? void 0 : _a.createNewProject();
        (_b = this.projectBuilder) === null || _b === void 0 ? void 0 : _b.buildIcon();
        (_c = this.projectBuilder) === null || _c === void 0 ? void 0 : _c.buildName();
        (_d = this.projectBuilder) === null || _d === void 0 ? void 0 : _d.buildTodos();
    };
    return ProjectDirector;
}());
exports["default"] = ProjectDirector;
