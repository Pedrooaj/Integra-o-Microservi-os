import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client-games';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // Garante que o Prisma use a URL carregada pelo Nest
          url: config.get<string>('DATABASE_GAMES_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}