import { NestFactory } from '@nestjs/core';
import { GamesModule } from './games.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(GamesModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'games',
      protoPath: join(__dirname, 'proto/games.proto'),
      url: '0.0.0.0:50053',
    },
  });

  app.setGlobalPrefix("api/v1/games");
  await app.startAllMicroservices();  
  await app.listen(3003);
  console.log('🚀 Servidor de Games rodando  em http://localhost:3003');
}
bootstrap();