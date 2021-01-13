import {
    IValidateStrategy,
    ValidationStrategy,
    ValidateEmailStrategy,
    ValidatePasswordStrategy,
    ValidateConfirmPasswordStrategy,
    ValidateUsernameStrategy,
} from "./ValidationStrategy";

export class Validate {
    static validateSignup(data: any): any {
        let errors: any = {};

        const validationStrategy: ValidationStrategy = new ValidationStrategy(
            null
        );
        const validateEmailStrategy: IValidateStrategy = new ValidateEmailStrategy();
        const validatePasswordStrategy: IValidateStrategy = new ValidatePasswordStrategy();
        const validateConfirmPasswordStrategy: IValidateStrategy = new ValidateConfirmPasswordStrategy();
        const validateUsernameStrategy: IValidateStrategy = new ValidateUsernameStrategy();

        validationStrategy.setStrategy(validateEmailStrategy);
        let emailErrors: any = validationStrategy.validate(data);

        validationStrategy.setStrategy(validatePasswordStrategy);
        let passwordErrors: any = validationStrategy.validate(data);

        validationStrategy.setStrategy(validateConfirmPasswordStrategy);
        let confirmPasswordStrategy: any = validationStrategy.validate(data);

        validationStrategy.setStrategy(validateUsernameStrategy);
        let usernameErrors: any = validationStrategy.validate(data);

        errors = {
            ...errors,
            ...emailErrors,
            ...passwordErrors,
            ...confirmPasswordStrategy,
            ...usernameErrors,
        };

        return errors;
    }

    static validateSignin(data: any): any {
        let errors: any = {};

        const validationStrategy: ValidationStrategy = new ValidationStrategy(
            null
        );
        const validateEmailStrategy: IValidateStrategy = new ValidateEmailStrategy();
        const validatePasswordStrategy: IValidateStrategy = new ValidatePasswordStrategy();

        validationStrategy.setStrategy(validateEmailStrategy);
        let emailErrors = validationStrategy.validate(data);

        validationStrategy.setStrategy(validatePasswordStrategy);
        let passwordErrors = validationStrategy.validate(data);

        errors = { ...errors, ...emailErrors, ...passwordErrors };

        return errors;
    }
}
