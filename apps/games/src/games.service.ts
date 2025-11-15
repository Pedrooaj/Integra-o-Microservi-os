import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  getHello(): string {
    return 'Aqui se encontra a Aplicação de Games';
  }
}
