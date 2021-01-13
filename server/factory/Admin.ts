export class Admin {
  public username: string;
  public email: string;
  public password: string;
  public confirmPassword: string;
  public role: String;

  public constructor(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = "ADMIN";
  }
}
