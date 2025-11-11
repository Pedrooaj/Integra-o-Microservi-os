import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Game } from './games.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService{
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const existingGame = await this.gamesRepository.findOne({ where: { title: createGameDto.title } });
    if (existingGame) {
      throw new ConflictException('Um jogo com esse nome ja existe.');
    }

    const newGame = this.gamesRepository.create({
      ...createGameDto,
      discount: createGameDto.discount || 0,
    });

    return this.gamesRepository.save(newGame);
  }


  async getAllGames(): Promise<Game[]> {
    return this.gamesRepository.find();
  }

  async getGameById(id: string): Promise<Game> {
    const game = await this.gamesRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException('Jogo nao encontrado.');
    }
    return game;
  }

  async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.getGameById(id);
    
    if(!game){
      throw new NotFoundException(`Jogo com o id ${id} encontrado.`);
    }
    Object.assign(game, updateGameDto);
    return this.gamesRepository.save(game);
  }

  async removeGame(id: string): Promise<void> {
    const result = await this.gamesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Jogo com ID ${id} não encontrado`);
    }
  }

  async deactivateGame(id: string): Promise<Game> {
    const game = await this.gamesRepository.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException(`Jogo com ID ${id} não encontrado`);
    }

    game.isActive = false;
    return await this.gamesRepository.save(game);
  }

  async updateRating(id: string, rating: number): Promise<Game> {
    const game = await this.gamesRepository.findOne({ where: { id } });

    if (!game) {
      throw new NotFoundException(`Jogo com ID ${id} não encontrado`);
    }

    const newTotalReviews = game.totalReviews + 1;
    const newAverageRating = ((game.averageRating * game.totalReviews) + rating) / newTotalReviews;

    game.totalReviews = newTotalReviews;
    game.averageRating = Number(newAverageRating.toFixed(2));

    return await this.gamesRepository.save(game);
  }

  async searchGames(query: string): Promise<Game[]> {
    return await this.gamesRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { developer: Like(`%${query}%`) },
        { publisher: Like(`%${query}%`) },
        { genres: Like(`%${query}%`) },
      ],
      take: 10,
    });
  }
  
}
