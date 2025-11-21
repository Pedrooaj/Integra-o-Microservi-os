import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'CreateUser')
  createUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GrpcMethod('UsersService', 'FindAll')
  async findAll() {
    const users = await this.usersService.findAll();
    return { users };
  }

  @GrpcMethod('UsersService', 'FindOne')
  findOne({ id }: { id: number }) {
    return this.usersService.findOne(id);
  }

  @GrpcMethod('UsersService', 'UpdateUser')
  updateUser(updateUserDto: UpdateUserDto) {
    // A DTO should contain the id of the user to update

    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @GrpcMethod('UsersService', 'RemoveUser')
  async removeUser({ id }: { id: number }) {
    await this.usersService.remove(id);
    return {};
  }
}
