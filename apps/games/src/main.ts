import { NestFactory } from '@nestjs/core';
import { GamesModule } from './games.module';

async function bootstrap() {
  const app = await NestFactory.create(GamesModule);
  await app.listen(3003);
  console.log('🚀 Servidor de Games rodando  em http://localhost:3003');
}
bootstrap();