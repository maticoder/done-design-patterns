"use strict";
exports.__esModule = true;
exports.Admin = void 0;
var Admin = /** @class */ (function () {
    function Admin(username, email, password, confirmPassword) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = "ADMIN";
    }
    return Admin;
}());
exports.Admin = Admin;
