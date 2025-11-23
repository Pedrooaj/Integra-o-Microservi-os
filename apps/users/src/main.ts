import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('UsersService');

  // 1. Criar app principal
  const app = await NestFactory.create(UsersModule);

  // 2. Conectar microserviço gRPC (Passando apenas as OPÇÕES)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, 'proto/users.proto'),
      url: '0.0.0.0:50052',
    },
  });

  // 3. Iniciar gRPC
  await app.startAllMicroservices();
  logger.log('Users Service gRPC listening on port 50052');

  // 4. Iniciar app REST na porta 3002
  await app.listen(3002);
  logger.log('Users Service REST listening on port 3002');
}
bootstrap();