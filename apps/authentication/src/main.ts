import { NestFactory } from '@nestjs/core';
import { AuthenticationModule } from './authentication.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);
  await app.listen(process.env.port ?? 3000);
  console.log(`Authentication service is running on: http://localhost:${process.env.port ?? 3000}`);
}
bootstrap();
