import { 
  Injectable, 
  NotFoundException, 
  UnauthorizedException, 
  ConflictException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  private authServiceUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    // Garante que a URL existe
    this.authServiceUrl = this.configService.getOrThrow<string>('AUTH_SERVICE_URL');
  }

  async validateUserIntegrity(token: string) {
    try {
      console.log('Validating token with Auth Service:', token);

      // O Axios no NestJS funciona assim: post(url, body, config)
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.authServiceUrl}/authentication/validate`, // ⚠️ ATENÇÃO NA URL
          {}, // Body vazio (já que não estamos mandando JSON)
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviando como Header padrão
            },
          }
        )
      );

      const result = response.data;

      if (!result || result.valid === false) {
        throw new UnauthorizedException("Invalid token or user does not exist");
      }
      return result;

    } catch (error) {
      console.error('Erro na validação de integridade:', error.message);
      
      if (error.response?.status === 401) {
        throw new UnauthorizedException("Invalid token");
      }
      
      // Se der 404 é porque a URL do serviço está errada
      if (error.response?.status === 404) {
        throw new InternalServerErrorException("Auth Service endpoint not found (Check URL)");
      }

      throw new InternalServerErrorException("Could not validate user integrity");
    }
  }

  async create(createUserDto: CreateUserDto, userAuthId: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: { userAuthId: userAuthId }
    });

    if (existingUser) {
      throw new ConflictException('User profile already exists for this account');
    }

    try {
      // 2. CRIAÇÃO
      return await this.prisma.user.create({ 
        data: {
          ...createUserDto, 
          userAuthId: userAuthId,
          level: 1,        
          experience: 0
        } 
      });
    } catch (error) {
      // 3. TRATAMENTO DE ERRO (Caso de concorrência ou Nickname duplicado)
      if (error.code === 'P2002') {
        // O erro P2002 retorna qual campo falhou no meta.target
        const target = error.meta?.target;

        if (Array.isArray(target)) {
           if (target.includes('nickname')) {
             throw new ConflictException('Nickname already taken');
           }
           if (target.includes('userAuthId')) {
             throw new ConflictException('User profile already exists');
           }
        }
        
        throw new ConflictException('Data conflict (Nickname or Email already exists)');
      }
      throw error;
    }
}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    // Converte para Number para garantir (caso venha string da rota)
    const idNumber = Number(id);
    
    const user = await this.prisma.user.findUnique({ where: { id: idNumber } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Reutiliza o findOne para garantir que existe (e lançar 404 se não existir)
    await this.findOne(id);

    const { id: _, ...data } = updateUserDto;
    
    try {
      return await this.prisma.user.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
       throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id: Number(id) } });
  }
}