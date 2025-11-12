import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';


@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.createGame(createGameDto);
  }

  @Get()
  getAll() {
    return this.gamesService.getAllGames();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gamesService.getGameById(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gamesService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gamesService.removeGame(id);
  }

  @Patch(':id/deactivate')
  deactivate(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gamesService.deactivateGame(id);
  }

  @Post(':id/rating')
  updateRating(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('rating') rating: number,
  ) {
    return this.gamesService.updateRating(id, rating);
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.gamesService.searchGames(query);
  }
}