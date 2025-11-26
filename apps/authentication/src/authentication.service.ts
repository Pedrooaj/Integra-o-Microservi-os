import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException, 
  NotFoundException 
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const { email, password, name } = data;

    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { 
      id: user.id.toString(), 
      email: user.email,
      message: 'User created successfully'
    };
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found'); // Retorna 404
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password'); // Retorna 401
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token, userId: user.id.toString() };
  }

  async validate(token: string) {
    try {
        const decoded = this.jwtService.verify(token);
        return { valid: true, userId: decoded.sub };
    } catch (e) {
        // Se o token for inválido, lança erro 401
        throw new UnauthorizedException('Invalid or expired token');
    }
  }
}