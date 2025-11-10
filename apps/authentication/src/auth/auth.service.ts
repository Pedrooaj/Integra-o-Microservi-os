// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service'; // Certifique-se que este caminho está correto
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async register(data) { 
        console.log(data);
        
        // --- VALIDAÇÃO DE ENTRADA ---
        if (!data.name || !data.email || !data.password) {
            throw new RpcException('Nome, Email e Senha são obrigatórios');
        }
        // --- FIM DA VALIDAÇÃO ---
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new RpcException("Usuário já existe");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        });

        // Remove a senha da resposta
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;

        return result; // Retorna { id, email, createdAt }
    }


    async login(data) { // 'data' vem do gRPC (tipo 'any' ou usar DTO)
        
        // --- VALIDAÇÃO DE ENTRADA ---
        if (!data || !data.email || !data.password) {
            throw new RpcException('Email e senha são obrigatórios');
        }
        // --- FIM DA VALIDAÇÃO ---

        const user = await this.prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!user) {
            throw new RpcException("Credenciais Inválidas"); // Não seja específico (segurança)
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new RpcException("Credenciais Inválidas"); // Não seja específico (segurança)
        }

        const payload = { userId: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        
        return { token };
    }

    async validateToken(data) {
        // --- VALIDAÇÃO DE ENTRADA ---
        if (!data || !data.token) {
            throw new RpcException('Token é obrigatório');
        }
        // --- FIM DA VALIDAÇÃO ---
        try {
            const payload = this.jwtService.verify(data.token);
            // O token é válido, retorna os dados
            return { isValid: true, userId: payload.userId };
        } catch (e) {
            // O token é expirado ou inválido
            throw new RpcException("Token Inválido");
        }
    }
}