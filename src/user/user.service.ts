import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { UserDTO } from "./dto/user.dto";
import { User } from "./schema/user.schema";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly config: ConfigService
  ) {}

  /**
   * Create user
   * @param {UserDTO} user User DTO
   * @returns {Promise<User>}
   */
  async createUser(user: UserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(user.password, salt);
    const newUser = new this.userModel({
      emailAddress: user?.email,
      password: hashPassword,
    });

    return newUser.save();
  }

  /**
   * Get all users
   * @returns {Promise<User[]>}
   */
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  /**
   * Delete user from application
   * @param {string} userId Delete user ID
   * @returns {Promise<User>}
   */
  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      const message = `Delete user for #${userId} has failed`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
    return deletedUser;
  }

  /**
   * Delete user by email
   * @param {string} email User's email
   */
  async deleteUserByEmail(email: string) {
    await this.userModel.findOneAndRemove({ emailAddress: email });
  }

  /**
   * Get single user based on ID
   * @param {string} userId User ID
   * @returns {Promise<User>}
   */
  async getUser(userId: string): Promise<User> {
    const singleUser = await this.userModel.findById(userId);
    if (!singleUser) {
      const message = `User for #${userId} not found`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
    return singleUser;
  }

  /**
   * Get user by email
   * @param {string} email User email
   * @returns {Promise<User>}
   */
  async getUserByEmail(email: string): Promise<User> {
    const singleUser = await this.userModel.findOne({
      emailAddress: email,
    });
    if (!singleUser) {
      const message = `User for #${email} not found`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
    return singleUser;
  }
}
