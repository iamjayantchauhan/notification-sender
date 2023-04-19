import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, NotificationSchema } from "./schema/notification.schema";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
