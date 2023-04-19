import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Notification } from "./schema/notification.schema";
import { Model } from "mongoose";
import { NotificationDTO } from "./dto/notification.dto";

@Injectable()
export class NotificationService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly config: ConfigService,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>
  ) {}

  getNotifications(): Promise<Notification[]> {
    return this.notificationModel.find();
  }

  createNotification(notificationDTO: NotificationDTO) {
    const notificationModel = new this.notificationModel({
      emailAddress: notificationDTO.email,
      notifications: notificationDTO.notifications,
    });
    return notificationModel.save();
  }
}
