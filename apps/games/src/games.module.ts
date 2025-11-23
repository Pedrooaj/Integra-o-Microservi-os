import {Module} from '@nestjs/common';
import {GamesService} from './games.service';
import {GamesController} from './games.controller';
import {PrismaService} from './prisma.service';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [GamesController],
    providers: [GamesService, PrismaService],
})
export class GamesModule {}