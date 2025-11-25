import { Inject, Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common'; // Use NotFoundException ou RpcException
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGrpcService } from './auth-grpc-service.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private authService: AuthGrpcService;
  constructor(
    private readonly prisma: PrismaService,
    @Inject("AUTH_PACKAGE") private client: ClientGrpc,
  ) { }

  onModuleInit() {
    this.authService = this.client.getService<AuthGrpcService>("AuthService");
  }

  async validateUserIntegrity(token: string) {
    try {
      const result = await firstValueFrom(this.authService.validate({ token }));
      if (!result || result.valid === false) {
        throw new UnauthorizedException("Invalid token or user does not exist");
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException("Could not validate user integrity");
    }
  }



  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException('Nickname already exists');
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new RpcException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const { id: _, ...data } = updateUserDto;
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({ where: { id } });
  }
}