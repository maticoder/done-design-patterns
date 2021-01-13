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
exports.__esModule = true;
exports.Validate = void 0;
var ValidationStrategy_1 = require("./ValidationStrategy");
var Validate = /** @class */ (function () {
    function Validate() {
    }
    Validate.validateSignup = function (data) {
        var errors = {};
        var validationStrategy = new ValidationStrategy_1.ValidationStrategy(null);
        var validateEmailStrategy = new ValidationStrategy_1.ValidateEmailStrategy();
        var validatePasswordStrategy = new ValidationStrategy_1.ValidatePasswordStrategy();
        var validateConfirmPasswordStrategy = new ValidationStrategy_1.ValidateConfirmPasswordStrategy();
        var validateUsernameStrategy = new ValidationStrategy_1.ValidateUsernameStrategy();
        validationStrategy.setStrategy(validateEmailStrategy);
        var emailErrors = validationStrategy.validate(data);
        validationStrategy.setStrategy(validatePasswordStrategy);
        var passwordErrors = validationStrategy.validate(data);
        validationStrategy.setStrategy(validateConfirmPasswordStrategy);
        var confirmPasswordStrategy = validationStrategy.validate(data);
        validationStrategy.setStrategy(validateUsernameStrategy);
        var usernameErrors = validationStrategy.validate(data);
        errors = __assign(__assign(__assign(__assign(__assign({}, errors), emailErrors), passwordErrors), confirmPasswordStrategy), usernameErrors);
        return errors;
    };
    Validate.validateSignin = function (data) {
        var errors = {};
        var validationStrategy = new ValidationStrategy_1.ValidationStrategy(null);
        var validateEmailStrategy = new ValidationStrategy_1.ValidateEmailStrategy();
        var validatePasswordStrategy = new ValidationStrategy_1.ValidatePasswordStrategy();
        validationStrategy.setStrategy(validateEmailStrategy);
        var emailErrors = validationStrategy.validate(data);
        validationStrategy.setStrategy(validatePasswordStrategy);
        var passwordErrors = validationStrategy.validate(data);
        errors = __assign(__assign(__assign({}, errors), emailErrors), passwordErrors);
        return errors;
    };
    return Validate;
}());
exports.Validate = Validate;
