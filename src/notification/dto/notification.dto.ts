import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail } from "class-validator";

export class NotificationDTO {
  @ApiProperty({
    type: String,
    description: "Email address of user",
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: [String],
    description: "User notifications",
  })
  @IsArray()
  readonly notifications: string[];

  constructor(notificationObject: NotificationDTO) {
    this.email = notificationObject?.email;
    this.notifications = notificationObject?.notifications;
  }
}
