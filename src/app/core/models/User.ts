import { Role } from "./Role";

export class User {
  id!: string;
  userName!: string;
  password!: string;
  email!: string;
  phoneNumber!: string;
  role!: Role;
}
