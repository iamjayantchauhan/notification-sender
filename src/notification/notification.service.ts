import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Notification } from "./schema/notification.schema";
import { Model } from "mongoose";
import { NotificationDTO } from "./dto/notification.dto";
import axios from "axios";

@Injectable()
export class NotificationService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly config: ConfigService,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>
  ) {}

  async getNotifications(): Promise<Notification[]> {
    return this.notificationModel.find();
  }

  async createNotification(notificationDTO: NotificationDTO) {
    const notificationModel = new this.notificationModel({
      emailAddress: notificationDTO.email,
      notifications: notificationDTO.notifications,
    });
    await this.sendEmail(notificationDTO);
    return notificationModel.save();
  }

  async deleteNotification(email: string) {
    await this.notificationModel.findOneAndRemove({ emailAddress: email });
  }

  private async sendEmail(notificationDTO: NotificationDTO) {
    const sendInBlueApiUrl = this.config.get("send_in_blue.api_url");
    const senderName = this.config.get("send_in_blue.sender_name");
    const senderEmail = this.config.get("send_in_blue.sender_email");
    const senderApiKey = this.config.get("send_in_blue.sender_api_key");
    try {
      const apiConfig = {
        url: sendInBlueApiUrl,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "api-key": senderApiKey,
        },
        data: {
          sender: {
            name: senderName,
            email: senderEmail,
          },
          to: [
            {
              email: notificationDTO?.email,
            },
          ],
          subject: "Notification Received",
          htmlContent: notificationDTO?.notifications.join(","),
        },
      };

      await axios(apiConfig);
    } catch (exception) {
      this.logger.error(`Email sending failed due to ${exception}`);
    }
  }
}
