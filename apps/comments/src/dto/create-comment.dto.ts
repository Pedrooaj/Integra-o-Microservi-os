import { IsString, IsNumber, Min, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(1, 500)
  description: string;

  @IsNumber()
  @Min(0)
  timePlayed: number; // tempo jogado em minutos

  @IsString()
  gameId: string;

  @IsString()
  userId: string;
}
