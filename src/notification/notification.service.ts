import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationService {
  getNotifications(): string {
    return "Hello World!";
  }
}
