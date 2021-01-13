import { isEmpty, isEmail, equals } from "validator";

export class ValidationStrategy {
  private strategy: IValidateStrategy = null;

  public constructor(strategy: IValidateStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: IValidateStrategy): void {
    this.strategy = strategy;
  }

  public getStrategy(): IValidateStrategy {
    return this.strategy;
  }

  validate(data: any): any {
    return this.strategy.validate(data);
  }
}

export interface IValidateStrategy {
  validate(data: any): any;
}

export class ValidateEmailStrategy implements IValidateStrategy {
  public validate(data: any): any {
    let errors: any = {};

    if (isEmpty(data.email)) {
      errors.email = "must not be empty";
    } else if (!isEmail(data.email)) {
      errors.email = "must be a valid email address";
    }

    return errors;
  }
}

export class ValidatePasswordStrategy implements IValidateStrategy {
  public validate(data: any): any {
    let errors: any = {};

    if (isEmpty(data.password)) errors.password = "must not be empty";

    return errors;
  }
}

export class ValidateConfirmPasswordStrategy implements IValidateStrategy {
  public validate(data: any): any {
    let errors: any = {};

    if (
      isEmpty(data.password) ||
      isEmpty(data.confirmPassword) ||
      !equals(data.password, data.confirmPassword)
    )
      errors.confirmPassword = "passwords must match";

    return errors;
  }
}

export class ValidateUsernameStrategy implements IValidateStrategy {
  public validate(data: any): any {
    let errors: any = {};

    if (isEmpty(data.username)) errors.username = "must not be empty";

    return errors;
  }
}
