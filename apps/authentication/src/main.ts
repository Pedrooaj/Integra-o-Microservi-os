import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AuthService');

  const app = await NestFactory.create(AuthenticationModule);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'auth',
  //     protoPath: join(__dirname, 'proto/auth.proto'),
  //     url: `0.0.0.0:50051`,
  //   },
  // });

  // await app.startAllMicroservices();
  // logger.log('Microservice Auth is listening on GRPC port 50051');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

   await app.listen(3001);
   logger.log('Microservice Auth is listening on REST port 3001');
}
bootstrap();