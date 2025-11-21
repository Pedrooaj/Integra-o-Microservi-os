import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('UsersService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'users',
        protoPath: join(__dirname, 'proto/users.proto'),
        url: '0.0.0.0:50052', // Porta onde este serviço vai escutar
      },
    },
  );

  await app.listen();
  logger.log('Microservice Users is listening on GRPC port 50052');
}
bootstrap();
