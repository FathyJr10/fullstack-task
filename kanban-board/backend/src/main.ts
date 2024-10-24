import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('fullstack Task API')
    .setDescription('API documentation for the fullstack Task')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Access it at /api-docs

  await app.listen(3000);
}
bootstrap();
