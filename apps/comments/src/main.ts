import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { CommentsModule } from './comments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const logger = new Logger('CommentsService');

  const app = await NestFactory.create(CommentsModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'comments',
      protoPath: join(__dirname, 'proto/comments.proto'),
      url: '0.0.0.0:50055',
    },
  });


  await app.startAllMicroservices();
  logger.log('Comments Service gRPC listening on port 50055');

  await app.listen(3004);
  logger.log('Comments Service REST listening on port 3004');
}
bootstrap();