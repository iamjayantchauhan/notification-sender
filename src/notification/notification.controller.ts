import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import {
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { responseGenerator } from "../utils/common.utils";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "../constants/response.message";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { NotificationDTO } from "./dto/notification.dto";

@ApiTags("Notification")
@Controller("notification")
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiOperation({ summary: "Retrieve list of notifications" })
  @ApiUnauthorizedResponse({
    description: RESPONSE_MESSAGES.common.unauthorized,
  })
  async getNotifications(@Res() response: Response) {
    try {
      const notificationData =
        await this.notificationService.getNotifications();
      return responseGenerator(
        response,
        StatusCodes.OK,
        RESPONSE_MESSAGES.notification.list.success,
        notificationData
      );
    } catch (exception) {
      return responseGenerator(
        response,
        exception.status,
        RESPONSE_MESSAGES.notification.list.fail,
        exception.response
      );
    }
  }

  @Post()
  @ApiOperation({ summary: "Create notification" })
  @ApiUnauthorizedResponse({
    description: RESPONSE_MESSAGES.common.unauthorized,
  })
  async createNotification(
    @Res() response: Response,
    @Body() notificationDTO: NotificationDTO
  ) {
    try {
      const notificationData =
        await this.notificationService.createNotification(notificationDTO);
      return responseGenerator(
        response,
        StatusCodes.OK,
        RESPONSE_MESSAGES.notification.create.success,
        notificationData
      );
    } catch (exception) {
      return responseGenerator(
        response,
        exception.status,
        RESPONSE_MESSAGES.notification.create.fail,
        exception.response
      );
    }
  }
}
