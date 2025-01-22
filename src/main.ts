import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = configService.get('PORT') || 3000;

  // Configuración global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Prefijo global para la API
  app.setGlobalPrefix('api/v1');

  // Configuración de seguridad
  app.use(helmet());
  app.use(compression());

  // Configuración CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .addTag('brands')
    .addTag('users')
    .addTag('auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Iniciar servidor
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Swagger documentation is available at: http://localhost:${port}/docs`);
}

bootstrap().catch((error) => {
  new Logger('Bootstrap').error('Error starting application:', error);
});
