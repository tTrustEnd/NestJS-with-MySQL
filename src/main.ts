import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config/dist';
import { JwtAuthGuard } from './auth/passport/auth/jwt-auth.guard';
import { TransformInterceptor } from 'decorator/logging.interceptor';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
  });
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    optionsSuccessStatus: 204

});
app.use(cookieParser());

app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // disableErrorMessages: true,
      transform: true,

    }),
  );
  
  const logger = new Logger(); // Tạo đối tượng LoggerService mới
  app.useLogger(logger); // Sử dụng LoggerService
    
  app.setGlobalPrefix('api/v1');
  app.use(express.static(join(__dirname, '..', 'public')));
  await app.listen(configService.get<string>("PORT"));
}
bootstrap();
