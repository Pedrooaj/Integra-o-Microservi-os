import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // --- REGISTRO ---
  async register(data: any) {
    const { email, password, name } = data;

    // 1. Verificar se usuário existe
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return { status: HttpStatus.CONFLICT, error: 'User already exists', id: null, email: null };
    }

    // 2. Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Criar usuário no banco
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { status: HttpStatus.CREATED, error: null, id: user.id.toString(), email: user.email };
  }

  // --- LOGIN ---
  async login(data: any) {
    const { email, password } = data;

    // 1. Buscar usuário
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { status: HttpStatus.NOT_FOUND, error: 'User not found', token: null };
    }

    // 2. Validar Senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: HttpStatus.UNAUTHORIZED, error: 'Invalid password', token: null };
    }

    // 3. Gerar Token JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { status: HttpStatus.OK, error: null, token, userId: user.id.toString() };
  }

  // --- VALIDATE ---
  async validate(token: string) {
    try {
        const decoded = this.jwtService.verify(token);
        return { status: HttpStatus.OK, valid: true, userId: decoded.sub };
    } catch (e) {
        return { status: HttpStatus.UNAUTHORIZED, valid: false, userId: null };
    }
  }
}