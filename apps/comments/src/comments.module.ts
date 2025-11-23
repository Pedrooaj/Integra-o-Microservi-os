import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ClientsModule.register([
      {
        name: 'GAMES_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'games',
          protoPath: join(__dirname, 'proto/games.proto'),
          url: '0.0.0.0:50053',
        },
      },
      {
        name: 'USERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'users', 
          protoPath: join(__dirname, 'proto/users.proto'),
          url: '0.0.0.0:50052',
        },
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService],
  exports: [CommentsService],
})
export class CommentsModule {}