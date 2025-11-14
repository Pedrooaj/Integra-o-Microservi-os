import { NestFactory } from '@nestjs/core';
import { CommentsModule } from './comments.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentsModule);
  await app.listen(process.env.port ?? 3001);
  console.log(`Comments service is running on: http://localhost:${process.env.port ?? 3001}`);
}
bootstrap();
