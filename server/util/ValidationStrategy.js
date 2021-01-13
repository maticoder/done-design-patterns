"use strict";
exports.__esModule = true;
exports.ValidateUsernameStrategy = exports.ValidateConfirmPasswordStrategy = exports.ValidatePasswordStrategy = exports.ValidateEmailStrategy = exports.ValidationStrategy = void 0;
var _a = require("validator")["default"], isEmpty = _a.isEmpty, isEmail = _a.isEmail, equals = _a.equals;
var ValidationStrategy = /** @class */ (function () {
    function ValidationStrategy(strategy) {
        this.strategy = null;
        this.strategy = strategy;
    }
    ValidationStrategy.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    ValidationStrategy.prototype.getStrategy = function () {
        return this.strategy;
    };
    ValidationStrategy.prototype.validate = function (data) {
        return this.strategy.validate(data);
    };
    return ValidationStrategy;
}());
exports.ValidationStrategy = ValidationStrategy;
var ValidateEmailStrategy = /** @class */ (function () {
    function ValidateEmailStrategy() {
    }
    ValidateEmailStrategy.prototype.validate = function (data) {
        var errors = {};
        if (isEmpty(data.email)) {
            errors.email = "must not be empty";
        }
        else if (!isEmail(data.email)) {
            errors.email = "must be a valid email address";
        }
        return errors;
    };
    return ValidateEmailStrategy;
}());
exports.ValidateEmailStrategy = ValidateEmailStrategy;
var ValidatePasswordStrategy = /** @class */ (function () {
    function ValidatePasswordStrategy() {
    }
    ValidatePasswordStrategy.prototype.validate = function (data) {
        var errors = {};
        if (isEmpty(data.password))
            errors.password = "must not be empty";
        return errors;
    };
    return ValidatePasswordStrategy;
}());
exports.ValidatePasswordStrategy = ValidatePasswordStrategy;
var ValidateConfirmPasswordStrategy = /** @class */ (function () {
    function ValidateConfirmPasswordStrategy() {
    }
    ValidateConfirmPasswordStrategy.prototype.validate = function (data) {
        var errors = {};
        if (isEmpty(data.password) ||
            isEmpty(data.confirmPassword) ||
            !equals(data.password, data.confirmPassword))
            errors.confirmPassword = "passwords must match";
        return errors;
    };
    return ValidateConfirmPasswordStrategy;
}());
exports.ValidateConfirmPasswordStrategy = ValidateConfirmPasswordStrategy;
var ValidateUsernameStrategy = /** @class */ (function () {
    function ValidateUsernameStrategy() {
    }
    ValidateUsernameStrategy.prototype.validate = function (data) {
        var errors = {};
        if (isEmpty(data.username))
            errors.username = "must not be empty";
        return errors;
    };
    return ValidateUsernameStrategy;
}());
exports.ValidateUsernameStrategy = ValidateUsernameStrategy;
