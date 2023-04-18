import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { AppModule } from "./app.module";
import { LoggerConfig } from "./common/logger";
import { swagger } from "./common/swagger";

const logger: LoggerConfig = new LoggerConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  if (config.get("environment_name") !== "local") {
    app.useLogger(WinstonModule.createLogger(logger.opts()));
  }

  swagger(app);

  await app.listen(config.get("port"));
}

bootstrap();
