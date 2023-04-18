import { IsEmail, IsString } from "class-validator";
import { Types } from "mongoose";
import { User } from "../schema/user.schema";

export class UserDTO {
  readonly _id: Types.ObjectId;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  constructor(userObject: User) {
    this.email = userObject?.emailAddress;
    this.password = userObject?.password;
  }
}
