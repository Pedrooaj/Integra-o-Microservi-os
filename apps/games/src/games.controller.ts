import {Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('/api/v1/games')
export class GamesController {
    constructor(private readonly gamesService: GamesService) {}

    @Get()
    getAllGames() {
        return this.gamesService.findAll();
    }

    @Get(':id')
    getGameById(@Param('id') id: string) {
        return this.gamesService.findById(Number(id));
    }

    @Post()
    createGame(@Body() createGameDto: CreateGameDto) {
        return this.gamesService.create(createGameDto);
    }

    @Put(':id')
    updateGame(@Param('id') id: string, @Body() updatedGame: Partial<CreateGameDto>) {
        return this.gamesService.update(Number(id), updatedGame);
    }

    @Delete(':id')
    deleteGame(@Param('id') id: string) {
        this.gamesService.remove(Number(id));
        return { message: `Game with ID ${id} has been deleted.` };
    }

    @GrpcMethod('GamesService', 'FindOneGame')
    findOne(data: { id: bigint }) {
        return this.gamesService.findOne(data.id);
    }
}