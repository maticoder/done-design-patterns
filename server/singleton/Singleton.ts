const User = require("../models/User");

export class Singleton {
  public static db: any = null;

  public static getInstance(): any {
    if (this.db === null) {
      this.db = User;
    }
    return this.db;
  }
}
