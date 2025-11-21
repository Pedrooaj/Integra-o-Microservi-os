import { NestFactory } from '@nestjs/core';
import { GamesModule } from './games.module';

async function bootstrap() {
  const app = await NestFactory.create(GamesModule);
  await app.listen(process.env.gamesPort ?? 3002);
}
bootstrap();
