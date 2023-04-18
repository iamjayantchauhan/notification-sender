import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerConfig } from "./common/logger";
import configuration from "./config/configuration";
import HealthController from "./health/health.controller";
import DatabaseModule from "./mongodb/database.module";
import { NotificationController } from "./notification/notification.controller";
import { NotificationModule } from "./notification/notification.module";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { TerminusModule } from "@nestjs/terminus";

const logger: LoggerConfig = new LoggerConfig();
const envFilePath = process.env.NODE_ENV == "test" ? ".env.test" : ".env";

const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    envFilePath: envFilePath,
  }),
  WinstonModule.forRoot(logger.opts()),
  DatabaseModule.forRoot(),
  TerminusModule,
  UserModule,
  NotificationModule,
];

const controllers = [
  AppController,
  NotificationController,
  UserController,
  HealthController,
];

const providers = [AppService];

@Module({
  imports: imports,
  controllers: controllers,
  providers: providers,
})
export class AppModule {}
