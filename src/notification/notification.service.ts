import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class NotificationService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly config: ConfigService
  ) {}

  getNotifications(): string {
    console.log("--->>");
    console.log(this.config.get("port"));
    this.logger.error("notification");
    return "Hello World!";
  }
}
