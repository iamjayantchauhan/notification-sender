import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { WinstonModule } from "nest-winston";
import { LoggerConfig } from "../common/logger";
import configuration from "../config/configuration";
import DatabaseModule from "../mongodb/database.module";
import { NotificationService } from "./notification.service";
import { Notification, NotificationSchema } from "./schema/notification.schema";
import { NotificationController } from "./notification.controller";
import { NotificationDTO } from "./dto/notification.dto";

const logger: LoggerConfig = new LoggerConfig();
const envFilePath = process.env.NODE_ENV == "test" ? ".env.test" : ".env";

describe("NotificationController", () => {
  let notificationService: NotificationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          envFilePath: envFilePath,
        }),
        WinstonModule.forRoot(logger.opts()),
        DatabaseModule.forRoot(),
        MongooseModule.forFeature([
          { name: Notification.name, schema: NotificationSchema },
        ]),
      ],
      controllers: [NotificationController],
      providers: [NotificationService],
      exports: [NotificationService],
    }).compile();

    notificationService = app.get<NotificationService>(NotificationService);
  });

  describe("createNotification", () => {
    it("it should return created notification", async () => {
      const notificationObject = new NotificationDTO({
        email: "test@test.com",
        notifications: ["test", "test"],
      });
      const response = await notificationService.createNotification(
        notificationObject
      );
      const data = response.toJSON();
      expect(data?.emailAddress).toBe("test@test.com");
    });
  });

  describe("deleteNotification", () => {
    it("it should delete notification", async () => {
      await notificationService.deleteNotification("test@test.com");
    });
  });

  describe("findAllNotification", () => {
    it("it should return array of notification", async () => {
      const response = await notificationService.getNotifications();
      expect(response.length).toBe(0);
    });
  });
});
