import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getHello(): string {
    return this.gamesService.getHello();
  }
}
