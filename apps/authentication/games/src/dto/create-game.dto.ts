import {isInt, IsNumber, IsString, Min, Length, IsDate} from "class-validator";

export class CreateGameDto {
    @IsString()
    @Length(1, 100)
    title: string;

    @IsString()
    @Length(1, 300)
    description: string;

    @IsString({ each: true })
    @Length(1, 50, { each: true })
    genres: string[];

    @IsDate()
    releaseDate: Date;

    @IsString()
    @Length(1, 100)
    developer: string;

    @IsNumber()
    @Min(0)
    rating: number;

    @IsNumber()
    @Min(0)
    price: number;
}