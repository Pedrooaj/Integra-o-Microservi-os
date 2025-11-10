import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

describe('GamesController', () => {
  let gamesController: GamesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [GamesService],
    }).compile();

    gamesController = app.get<GamesController>(GamesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gamesController.getHello()).toBe('Hello World!');
    });
  });
});
