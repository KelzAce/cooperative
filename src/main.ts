import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { APP_WEBSITE_URL } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('port');
  const isProduction = configService.getOrThrow<boolean>('env.isProduction');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: isProduction ? 'www.your-url.com' : '*',
  });

  await app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}
bootstrap();