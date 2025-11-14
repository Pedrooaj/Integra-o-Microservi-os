import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(process.env.port ?? 3003);
  console.log(`Users service is running on: http://localhost:${process.env.port ?? 3003}`);
}
bootstrap();
