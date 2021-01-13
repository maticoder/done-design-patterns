import { User } from "./User";
import { Admin } from "./Admin";

export class Factory {
  public get(role: String, data: any): User | Admin {
    const { username, email, password, confirmPassword } = data;
    if (role === "USER") {
      return new User(username, email, password, confirmPassword);
    } else if (role === "ADMIN") {
      return new Admin(username, email, password, confirmPassword);
    }
  }
}
