import { Body, Controller, Post, Res } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "../constants/response.message";
import { UserDTO } from "../user/dto/user.dto";
import { responseGenerator } from "../utils/common.utils";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOkResponse({ description: RESPONSE_MESSAGES.auth.success })
  @ApiOperation({ summary: "Login to application" })
  @ApiUnauthorizedResponse({
    description: RESPONSE_MESSAGES.common.unauthorized,
  })
  @ApiBadRequestResponse({ description: RESPONSE_MESSAGES.auth.notMatching })
  async login(
    @Res() response: Response,
    @Body() userDTO: UserDTO
  ): Promise<Record<string, any>> {
    try {
      const responseData = await this.authService.login(userDTO);
      return responseGenerator(
        response,
        StatusCodes.OK,
        RESPONSE_MESSAGES.auth.success,
        responseData
      );
    } catch (exception) {
      return responseGenerator(
        response,
        exception.status,
        RESPONSE_MESSAGES.auth.notMatching,
        exception.response
      );
    }
  }

  @Post("signup")
  @ApiCreatedResponse({ description: RESPONSE_MESSAGES.user.create })
  @ApiForbiddenResponse({ description: RESPONSE_MESSAGES.user.failed })
  @ApiOperation({ summary: "Signup for application" })
  async signUpUser(@Res() response: Response, @Body() userDTO: UserDTO) {
    try {
      const userData = await this.authService.signUpUser(userDTO);
      return responseGenerator(
        response,
        StatusCodes.CREATED,
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
}
