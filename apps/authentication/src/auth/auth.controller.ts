import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @GrpcMethod("AuthService", "Register")
    register(data){
        return this.authService.register(data);
    }

    @GrpcMethod("AuthService", "Login")
    login(data){
        return this.authService.login(data)
    }

    @GrpcMethod("AuthService", "ValidateToken")
    validateToken(data){
        return this.authService.validateToken(data);
    }
}
