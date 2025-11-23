import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // REST endpoints
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // gRPC endpoints
  @GrpcMethod('UsersService', 'CreateUser')
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UsersService', 'FindAll')
  async findAllGrpc() {
    const users = await this.usersService.findAll();
    return { users };
  }

  @GrpcMethod('UsersService', 'FindOne')
  findOneGrpc({ id }: { id: number }) {
    return this.usersService.findOne(id);
  }

  @GrpcMethod('UsersService', 'UpdateUser')
  updateUser(updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersService', 'RemoveUser')
  async removeUser({ id }: { id: number }) {
    await this.usersService.remove(id);
    return {};
  }
}
