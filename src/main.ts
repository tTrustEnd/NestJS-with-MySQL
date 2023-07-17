import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config/dist';
import { JwtAuthGuard } from './auth/passport/auth/jwt-auth.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = 3000;
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      disableErrorMessages: true,
      transform: true,

    }),
  );
  await app.listen(port);


 
}
bootstrap();
