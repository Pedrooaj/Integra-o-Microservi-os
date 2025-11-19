import { NestFactory } from '@nestjs/core';
import { GamesModule } from './games.module';

async function bootstrap() {
  const app = await NestFactory.create(GamesModule);
  await app.listen(3000);
  console.log('🚀 Servidor rodando em http://localhost:3000');
}
bootstrap();