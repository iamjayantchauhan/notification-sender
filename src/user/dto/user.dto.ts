import { IsEmail, IsString } from "class-validator";

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
