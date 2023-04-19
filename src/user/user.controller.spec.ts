import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { WinstonModule } from "nest-winston";
import { LoggerConfig } from "../common/logger";
import configuration from "../config/configuration";
import DatabaseModule from "../mongodb/database.module";
import { UserDTO } from "./dto/user.dto";
import { User, UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UserModule } from "./user.module";
import { UserService } from "./user.service";

const logger: LoggerConfig = new LoggerConfig();
const envFilePath = process.env.NODE_ENV == "test" ? ".env.test" : ".env";

describe("UserController", () => {
  let userService: UserService;

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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        UserModule,
      ],
      controllers: [UserController],
      providers: [UserService],
      exports: [UserService],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe("createUser", () => {
    it("it should return user", async () => {
      const userObject = new UserDTO({
        email: "test@test.com",
        password: "123456",
      });
      const response = await userService.createUser(userObject);
      const data = response.toJSON();
      expect(data?.emailAddress).toBe("test@test.com");
    });
  });

  describe("deleteUserByEmail", () => {
    it("it should delete the user", async () => {
      await userService.deleteUserByEmail("test@test.com");
    });
  });

  describe("findAllUsers", () => {
    it("it should return array of users", async () => {
      const response = await userService.getAllUsers();
      expect(response.length).toBe(0);
    });
  });
});
