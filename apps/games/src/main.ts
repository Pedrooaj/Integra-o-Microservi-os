import { NestFactory } from '@nestjs/core';
import { GamesModule } from './games.module';

async function bootstrap() {
  const app = await NestFactory.create(GamesModule);
  await app.listen(process.env.port ?? 3002);
  console.log(`Games service is running on: http://localhost:${process.env.port ?? 3002}`);
}
bootstrap();
