import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.prisma.comment.create({ data: createCommentDto });
    } catch (error) {
      throw new RpcException('Error creating comment');
    }
  }

  async findAll() {
    return await this.prisma.comment.findMany();
  }

  async findOne(id: bigint) {
    return await this.prisma.comment.findUnique({ where: { id } });
  }

  async findByGame(gameId: string) {
    return await this.prisma.comment.findMany({ where: { gameId } });
  }

  async findByUser(userId: string) {
    return await this.prisma.comment.findMany({ where: { userId } });
  }

  async update(id: bigint, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
      });
    } catch (error) {
      throw new RpcException('Error updating comment');
    }
  }

  async remove(id: bigint) {
    try {
      await this.prisma.comment.delete({ where: { id } });
    } catch (error) {
      throw new RpcException('Error removing comment');
    }
  }
}
