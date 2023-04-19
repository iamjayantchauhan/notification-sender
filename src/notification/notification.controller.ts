import { Controller, Get } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { ApiTags } from "@nestjs/swagger";

@Controller()
@ApiTags("Notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get("/notifications")
  getHello(): string {
    return this.notificationService.getNotifications();
  }
}
