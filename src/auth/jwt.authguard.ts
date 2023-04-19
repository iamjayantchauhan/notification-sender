import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { RESPONSE_MESSAGES } from "../constants/response.message";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requestObject = context.switchToHttp().getRequest();

    if (!requestObject.headers["authorization"]) {
      throw new UnauthorizedException(RESPONSE_MESSAGES.auth.missingToken);
    }

    const token = requestObject.headers["authorization"]
      .split("Bearer")[1]
      .trim();

    const isValidToken = await this.authService.verifyToken(token);

    if (!isValidToken) {
      throw new UnauthorizedException(RESPONSE_MESSAGES.auth.tokenExpired);
    }

    return true;
  }
}
