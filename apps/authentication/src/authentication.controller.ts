import { Body, Controller, Post, Headers } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}


  @Post("register")
  async registerRest(@Body() data: any) {
    return await this.authService.register(data);
  }

  @Post("login")
  async loginRest(@Body() data: any) {
    return await this.authService.login(data);
  }

  @Post("validate")
  async validateRest(@Headers('authorization') authHeader: string){
    const token = authHeader?.split(" ")[1];
    return await this.authService.validate(token);
  }

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