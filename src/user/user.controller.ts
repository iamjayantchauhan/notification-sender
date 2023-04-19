import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "../constants/response.message";
import { responseGenerator } from "../utils/common.utils";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response: Response, @Body() userDTO: UserDTO) {
    try {
      const userData = await this.userService.createUser(userDTO);
      return responseGenerator(
        response,
        StatusCodes.OK,
        RESPONSE_MESSAGES.user.create,
        userData
      );
    } catch (exception) {
      return responseGenerator(
        response,
        exception.status,
        RESPONSE_MESSAGES.user.failed,
        exception.response
      );
    }
  }

  @Get()
  async getAllUsers(@Res() response: Response) {
    try {
      const userData = await this.userService.getAllUsers();
      return responseGenerator(
        response,
        StatusCodes.OK,
        RESPONSE_MESSAGES.user.list,
        userData
      );
    } catch (exception) {
      return responseGenerator(
        response,
        exception.status,
        RESPONSE_MESSAGES.user.failed,
        exception.response
      );
    }
  }

  @Get("/:id")
  async getUser(@Res() response: Response, @Param("id") userId: string) {
    try {
      const userData = await this.userService.getUser(userId);
      return responseGenerator(
        response,
        StatusCodes.OK,
        RESPONSE_MESSAGES.user.single,
        userData
      );
    } catch (exception) {
      return responseGenerator(
        response,
        exception.status,
        RESPONSE_MESSAGES.user.failed,
        exception.response
      );
    }
  }

  @Delete("/:id")
  async deleteUser(@Res() response: Response, @Param("id") userId: string) {
    try {
      const userData = await this.userService.deleteUser(userId);
      return responseGenerator(
        response,
        StatusCodes.OK,
        RESPONSE_MESSAGES.user.remove,
        userData
      );
    } catch (exception) {
      return responseGenerator(
        response,
        exception.status,
        RESPONSE_MESSAGES.user.failed,
        exception.response
      );
    }
  }
}
