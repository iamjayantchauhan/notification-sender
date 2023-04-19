import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { UserDTO } from "../user/dto/user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  /**
   * Generate token without encryption
   * @param emailAddress User email
   * @returns Token information
   */
  private async generateToken(emailAddress: string): Promise<string> {
    const payload = { emailAddress };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.get<string>("jwt_secret"),
      expiresIn: this.config.get<string>("jwt_expiry"),
    });

    return accessToken;
  }

  async verifyToken(token: string): Promise<Record<string, any> | null> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>("jwt_secret"),
      });
    } catch (exception) {
      this.logger.error(exception);
      return null;
    }
  }

  async login(user: UserDTO) {
    const token = await this.generateToken(user?.email);
    return {
      accessToken: token,
    };
  }

  async signUpUser(user: UserDTO): Promise<Record<string, any>> {
    const userResponse = await this.userService.createUser(user);
    if (!userResponse) {
      const message = `Create user for #${user?.email} has failed`;
      this.logger.error(message);
      return null;
    }
    const token = this.generateToken(user?.email);
    return {
      accessToken: token,
    };
  }
}
