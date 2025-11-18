import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client-auth';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          // Garante que o Prisma use a URL carregada pelo Nest
          url: config.get<string>('DATABASE_AUTH_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}