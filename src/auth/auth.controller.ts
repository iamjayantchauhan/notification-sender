import { Body, Controller, Post, Res } from "@nestjs/common";
import { UserDTO } from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import { responseGenerator } from "../utils/common.utils";
import { RESPONSE_MESSAGES } from "../constants/response.message";
import { StatusCodes } from "http-status-codes";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() userDTO: UserDTO): Promise<Record<string, any>> {
    return this.authService.login(userDTO);
  }

  @Post("signup")
  async signUpUser(@Res() response: Response, @Body() userDTO: UserDTO) {
    try {
      const userData = await this.authService.signUpUser(userDTO);
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
}
