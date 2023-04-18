import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerConfig } from "./common/logger";
import configuration from "./config/configuration";
import { NotificationController } from "./notification/notification.controller";
import { NotificationService } from "./notification/notification.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";

const logger: LoggerConfig = new LoggerConfig();
const envFilePath = process.env.NODE_ENV == "test" ? ".env.test" : ".env";

const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    envFilePath: envFilePath,
  }),
  WinstonModule.forRoot(logger.opts()),
];

const controllers = [AppController, NotificationController, UserController];

const providers = [AppService, NotificationService, UserService];

@Module({
  imports: imports,
  controllers: controllers,
  providers: providers,
})
export class AppModule {}
