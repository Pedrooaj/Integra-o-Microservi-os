import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AuthService');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthenticationModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(__dirname, 'proto/auth.proto'),
        url: '0.0.0.0:50051', // Porta onde este serviço vai escutar
      },
    },
  );

  await app.listen();
  logger.log('Microservice Auth is listening on GRPC port 50051');
}
bootstrap();