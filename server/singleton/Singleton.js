"use strict";
exports.__esModule = true;
exports.Singleton = void 0;
var User = require("../models/User");
var Singleton = /** @class */ (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        if (this.db === null) {
            this.db = User;
        }
        return this.db;
    };
    Singleton.db = null;
    return Singleton;
}());
exports.Singleton = Singleton;
