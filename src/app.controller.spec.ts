import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerConfig } from "./common/logger";
import configuration from "./config/configuration";

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

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: imports,
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "1.0.0"', () => {
      expect(appController.getVersion()).toBe("1.0.0");
    });
  });
});
