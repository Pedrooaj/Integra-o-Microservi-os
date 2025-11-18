import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @GrpcMethod('AuthService', 'Register')
  async register(data: any) {
    return await this.authService.register(data);
  }

  @GrpcMethod('AuthService', 'Login')
  async login(data: any) {
    return await this.authService.login(data);
  }

  @GrpcMethod('AuthService', 'Validate')
  async validate(data: { token: string }) {
    return await this.authService.validate(data.token);
  }
}