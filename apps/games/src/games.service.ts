import { Injectable } from "@nestjs/common";
import { Games } from "./games.model";
import { CreateGameDto } from "./dto/create-game.dto";
import { PrismaService } from "./prisma.service";

@Injectable()
export class GamesService {
    private games: Games[] = [];
    private idCounter = 1;

    constructor(private readonly prisma: PrismaService) {}

    findAll(): Games[] {
        return this.games;
    }

    findById(id: number): Games | undefined {
        if(!this.games){
            throw new Error('A game with this ID doesn\'t exist.');
        }
        return this.games.find(game => game.id === id);
    }

    create(createGameDto: CreateGameDto): Games {
        const newGame: Games = { id: this.idCounter++, ...createGameDto };
        this.games.push(newGame);
        return newGame;
    }

    update(id: number, updateGame: Partial<CreateGameDto>): Games {
        const gameId = this.findById(id);
        if (!gameId) {
            throw new Error('A game with this ID doesn\'t exist.');
        }
        Object.assign(gameId, updateGame);
        console.log(`Game with ID ${id} has been successfully updated.`);
        return gameId;
    }

    remove(id: number): void {
        const gameId = this.findById(id);
        if (!gameId) {
            throw new Error('A game with this ID doesn\'t exist.');
        }
        this.games.splice(this.games.indexOf(gameId), 1);
        console.log(`Game with ID ${id} has been removed.`);
    }

    async findOne(id: bigint) {
        return this.prisma.game.findUnique({
            where: { id },
        });
    }
}