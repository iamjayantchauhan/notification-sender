import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export function swagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Notification Sender")
    .setDescription("The application for sending notification to users")
    .setVersion("1.0")
    .addTag("notification")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);
}
