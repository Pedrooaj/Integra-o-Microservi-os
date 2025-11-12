import { IsString, IsNumber, IsArray, IsDate, IsBoolean, IsOptional, Min, Max, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  developer: string;

  @IsString()
  publisher: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  discount?: number;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @IsString({ each: true })
  platforms: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsDate()
  releaseDate: Date;

  @IsUrl()
  @IsOptional()
  coverImage?: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  screenshots?: string[];

  @IsString()
  @IsOptional()
  systemRequirements?: string;
}