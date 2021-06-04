import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //before every erndpoint should be api
  app.setGlobalPrefix('api')
  //in order to work dtop validations
  app.useGlobalPipes(new ValidationPipe());
  // use cookie parser
  app.use(cookieParser())
  // credentials true in order to pass cookies back and forth
  //for every request
  app.enableCors({
    origin:'http://localhost:4200',
    credentials: true
  })
  await app.listen(3000);
}
bootstrap();
