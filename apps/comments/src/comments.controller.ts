import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('api/v1/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // REST endpoints
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(
    @Query('gameId') gameId?: bigint,
    @Query('userId') userId?: string,
  ) {
    if (gameId) {
      return this.commentsService.findByGame(gameId);
    }
    if (userId) {
      return this.commentsService.findByUser(userId);
    }
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(BigInt(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(BigInt(id), updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(BigInt(id));
  }

  // gRPC endpoints
  @GrpcMethod('CommentsService', 'CreateComment')
  createComment(createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @GrpcMethod('CommentsService', 'FindAll')
  async findAllGrpc() {
    const comments = await this.commentsService.findAll();
    return { comments };
  }

  @GrpcMethod('CommentsService', 'FindOne')
  findOneGrpc({ id }: { id: bigint }) {
    return this.commentsService.findOne(id);
  }

  @GrpcMethod('CommentsService', 'FindByGame')
  findByGameGrpc({ gameId }: { gameId: bigint }) {
    return this.commentsService.findByGame(gameId);
  }

  @GrpcMethod('CommentsService', 'FindByUser')
  findByUserGrpc({ userId }: { userId: string }) {
    return this.commentsService.findByUser(userId);
  }

  @GrpcMethod('CommentsService', 'UpdateComment')
  updateComment(updateCommentDto: UpdateCommentDto) {
    if (!updateCommentDto.id) {
      throw new Error('Comment ID is required');
    }
    return this.commentsService.update(
      updateCommentDto.id,
      updateCommentDto,
    );
  }

  @GrpcMethod('CommentsService', 'RemoveComment')
  async removeComment({ id }: { id: bigint }) {
    await this.commentsService.remove(id);
    return {};
  }
}
