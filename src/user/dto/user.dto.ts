import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UserDTO {
  @ApiProperty({
    type: String,
    description: "Email address of user",
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: "Password of user",
  })
  @IsString()
  readonly password: string;

  constructor(userObject: UserDTO) {
    this.email = userObject?.email;
    this.password = userObject?.password;
  }
}
