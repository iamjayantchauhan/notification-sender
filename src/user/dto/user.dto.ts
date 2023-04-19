import { IsEmail, IsString } from "class-validator";
import { Types } from "mongoose";
import { User } from "../schema/user.schema";

export class UserDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  constructor(userObject: UserDTO) {
    this.email = userObject?.email;
    this.password = userObject?.password;
  }
}
