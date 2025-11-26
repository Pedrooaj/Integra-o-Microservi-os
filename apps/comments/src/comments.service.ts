import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'; // <--- O cliente HTTP
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { firstValueFrom } from 'rxjs'; // firstValueFrom é mais comum com Axios que lastValueFrom

@Injectable()
export class CommentsService {
  private gamesServiceUrl: string;
  private usersServiceUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.gamesServiceUrl = this.configService.getOrThrow<string>('GAMES_SERVICE_URL');
    this.usersServiceUrl = this.configService.getOrThrow<string>('USERS_SERVICE_URL');
  }

  async create(createCommentDto: CreateCommentDto) {
    const gameIdNumber = Number(createCommentDto.gameId);
    const userIdNumber = Number(createCommentDto.userId);

    try {
      await firstValueFrom(
        this.httpService.get(`${this.gamesServiceUrl}/games/${gameIdNumber}`)
      );
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException(`Game com id ${gameIdNumber} não encontrado.`);
      }
      console.error('Erro ao validar Game:', error.message);
      throw new InternalServerErrorException('Falha ao comunicar com serviço de Games.');
    }

    try {
      await firstValueFrom(
        this.httpService.get(`${this.usersServiceUrl}/users/${userIdNumber}`)
      );
    } catch (error) {
      // Aqui tratamos se o usuário não existe
      if (error.response?.status === 404) {
        throw new NotFoundException(`Usuário com id ${userIdNumber} não encontrado.`);
      }
      
      // Se o serviço de usuário retornou 500, o problema é lá, mas aqui lançamos erro também
      console.error('Erro ao validar User:', error.message);
      throw new InternalServerErrorException('Falha ao comunicar com serviço de Users.');
    }

    try {
      return await this.prisma.comment.create({
        data: {
          description: createCommentDto.description,
          timePlayed: createCommentDto.timePlayed,
          gameId: gameIdNumber, 
          userId: String(userIdNumber), 
        },
      });
    } catch (error) {
      console.error('Erro Prisma:', error);
      throw new InternalServerErrorException('Erro ao salvar comentário no banco de dados.');
    }
  }

  async findAll() { 
    return await this.prisma.comment.findMany(); 
  }

  async findOne(id: bigint) { 
    const comment = await this.prisma.comment.findUnique({ where: { id } }); 
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async findByGame(gameId: bigint) { 
    return await this.prisma.comment.findMany({ where: { gameId } }); 
  }
  
  async findByUser(userId: string) { 
    return await this.prisma.comment.findMany({ where: { userId } }); 
  }

  async update(id: bigint, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.prisma.comment.update({ where: { id }, data: updateCommentDto });
    } catch (error) { 
        throw new InternalServerErrorException('Error updating comment'); 
    }
  }

  async remove(id: bigint) {
    try {
      await this.prisma.comment.delete({ where: { id } });
    } catch (error) { 
        throw new InternalServerErrorException('Error removing comment'); 
    }
  }
}