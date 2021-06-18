export class userModel {
  userName : string;
  password: String;
  email: string;
  token: string;
  roles : string;
  age: number;
  id: number;

  constructor() {
    this.userName = "";
    this.password = "";
    this.email = "";
    this.token = "";
    this.roles = "";
    this.age = 0;
    this.id = 0;
  }
}
