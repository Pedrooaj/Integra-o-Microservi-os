import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { RpcException, ClientGrpc } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { lastValueFrom } from 'rxjs';

interface GamesServiceClient {
  findOneGame(data: { id: number }): any;
}

interface UsersServiceClient {
  findOne(data: { id: number }): any;
}

@Injectable()
export class CommentsService implements OnModuleInit {
  private gamesService: GamesServiceClient;
  private usersService: UsersServiceClient; 

  constructor(
    private readonly prisma: PrismaService,
    @Inject('GAMES_PACKAGE') private clientGames: ClientGrpc,
    @Inject('USERS_PACKAGE') private clientUsers: ClientGrpc 
  ) {}

  onModuleInit() {
    this.gamesService = this.clientGames.getService<GamesServiceClient>('GamesService');
    this.usersService = this.clientUsers.getService<UsersServiceClient>('UsersService');
  }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const gameIdNumber = Number(createCommentDto.gameId);
      await lastValueFrom(this.gamesService.findOneGame({ id: gameIdNumber }));
    } catch (error) {
      console.error('Erro Game:', error);
      throw new RpcException('Game not found or Service unavailable');
    }

    try {
      const userIdNumber = Number(createCommentDto.userId);
      
      await lastValueFrom(this.usersService.findOne({ id: userIdNumber }));
      
    } catch (error) {
      console.error('Erro User:', error);
      throw new RpcException('User not found or Users Service unavailable');
    }

    try {
      return await this.prisma.comment.create({ data: createCommentDto });
    } catch (error) {
      throw new RpcException('Error creating comment');
    }
  }

  async findAll() { return await this.prisma.comment.findMany(); }
  async findOne(id: bigint) { return await this.prisma.comment.findUnique({ where: { id } }); }
  async findByGame(gameId: bigint) { return await this.prisma.comment.findMany({ where: { gameId } }); }
  async findByUser(userId: string) { return await this.prisma.comment.findMany({ where: { userId } }); }
  async update(id: bigint, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.prisma.comment.update({ where: { id }, data: updateCommentDto });
    } catch (error) { throw new RpcException('Error updating comment'); }
  }
  async remove(id: bigint) {
    try {
      await this.prisma.comment.delete({ where: { id } });
    } catch (error) { throw new RpcException('Error removing comment'); }
  }
}