"use strict";
exports.__esModule = true;
exports.Factory = void 0;
var User_1 = require("./User");
var Admin_1 = require("./Admin");
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.prototype.get = function (role, data) {
        var username = data.username, email = data.email, password = data.password, confirmPassword = data.confirmPassword;
        if (role === "USER") {
            return new User_1.User(username, email, password, confirmPassword);
        }
        else if (role === "ADMIN") {
            return new Admin_1.Admin(username, email, password, confirmPassword);
        }
    };
    return Factory;
}());
exports.Factory = Factory;
