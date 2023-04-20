import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fs from "fs";

export function swagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Notification Sender")
    .setDescription("The application for sending notification to users")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
  SwaggerModule.setup("api/docs", app, document);
}
