import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { LoggerConfig } from "./common/logger";
import { ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";

const logger: LoggerConfig = new LoggerConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  if (config.get("environment_name") !== "local") {
    app.useLogger(WinstonModule.createLogger(logger.opts()));
  }

  // Swagger configurations
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Notification Sender")
    .setDescription("The application for sending notification to users")
    .setVersion("1.0")
    .addTag("notification")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  await app.listen(config.get("port"));
}

bootstrap();
