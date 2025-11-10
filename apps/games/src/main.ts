import { NestFactory } from '@nestjs/core';
import { GamesModule } from './games.module';

async function bootstrap() {
  const app = await NestFactory.create(GamesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
