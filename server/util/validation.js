"use strict";
exports.__esModule = true;
exports.validateSigninData = exports.validateSignupData = void 0;
var Validate_1 = require("./Validate");
function validateSignupData(data) {
    // username email password confirmPassword
    var errors = Validate_1.Validate.validateSignup(data);
    // return errors and valid
    return {
        errors: errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}
exports.validateSignupData = validateSignupData;
function validateSigninData(data) {
    var errors = Validate_1.Validate.validateSignin(data);
    // return errors and valid
    return {
        errors: errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}
exports.validateSigninData = validateSigninData;
