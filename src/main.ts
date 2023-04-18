import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configurations
  const config = new DocumentBuilder()
    .setTitle("Notification Sender")
    .setDescription("The application for sending notification to users")
    .setVersion("1.0")
    .addTag("notification")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
