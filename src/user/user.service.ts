import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { User } from "./schema/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly config: ConfigService
  ) {}

  async createUser(user: UserDTO): Promise<User> {
    const newUser = new this.userModel({
      emailAddress: user?.email,
      password: user?.password,
    });
    return newUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    const usersData = await this.userModel.find();
    if (!usersData || usersData.length == 0) {
      throw new NotFoundException("Users data not found!");
    }
    return usersData;
  }

  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      const message = `Delete user for #${userId} has failed`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
    return deletedUser;
  }
}
