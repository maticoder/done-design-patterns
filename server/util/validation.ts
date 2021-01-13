import { Validate } from "./Validate";

export function validateSignupData(data: any): any {
    // username email password confirmPassword
    let errors: any = Validate.validateSignup(data);

    // return errors and valid
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
}

export function validateSigninData(data: any): any {
    let errors: any = Validate.validateSignin(data);

    // return errors and valid
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
}
