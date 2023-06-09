import { Controller, Delete, Get, Param, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { RESPONSE_MESSAGES } from "../constants/response.message";
import { responseGenerator } from "../utils/common.utils";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Retrieve all users" })
  @ApiResponse({
    status: StatusCodes.OK,
    description: RESPONSE_MESSAGES.user.list,
  })
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
  @ApiOperation({ summary: "Get single user" })
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
  @ApiOperation({ summary: "Delete single user" })
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
