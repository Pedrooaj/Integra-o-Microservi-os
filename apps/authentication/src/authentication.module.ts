import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService],
})
export class AuthenticationModule {}
