import { GamesService } from './games.service';
import { Games } from './games.model';

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    service = new GamesService();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um game corretamente', () => {
    const gameData: Omit<Games, 'id'> = {
      title: 'The Legend of Zelda: Breath of the Wild',
      description: 'Um jogo de mundo aberto da Nintendo',
      genres: ['Aventura', 'Exploração'],
      releaseDate: new Date('2017-03-03'),
      developer: 'Nintendo',
      rating: 9.8,
      price: 59.99,
    };

    const newGame = service.create(gameData);

    expect(newGame).toHaveProperty('id');
    expect(newGame.title).toBe('The Legend of Zelda: Breath of the Wild');
    expect(newGame.genres).toContain('Aventura');
    expect(newGame.releaseDate instanceof Date).toBe(true);
  });

  it('deve listar todos os games', () => {
    service.create({
      title: 'God of War',
      description: 'Kratos em uma nova jornada',
      genres: ['Ação'],
      releaseDate: new Date('2018-04-20'),
      developer: 'Santa Monica Studio',
      rating: 9.7,
      price: 49.99,
    });

    const games = service.findAll();
    expect(games.length).toBeGreaterThan(0);
  });

  it('deve retornar um game pelo ID', () => {
    const created = service.create({
      title: 'Hollow Knight',
      description: 'Um metroidvania desafiador',
      genres: ['Ação', 'Plataforma'],
      releaseDate: new Date('2017-02-24'),
      developer: 'Team Cherry',
      rating: 9.0,
      price: 19.99,
    });

    const found = service.findById(created.id);
    expect(found?.title).toBe('Hollow Knight');
  });

  it('deve atualizar um game', () => {
    const created = service.create({
      title: 'Cyberpunk 2077',
      description: 'RPG futurista',
      genres: ['RPG'],
      releaseDate: new Date('2020-12-10'),
      developer: 'CD Projekt Red',
      rating: 7.5,
      price: 59.99,
    });

    const updated = service.update(created.id, { rating: 8.5, price: 39.99 });
    expect(updated.rating).toBe(8.5);
    expect(updated.price).toBe(39.99);
  });

  it('deve remover um game', () => {
    const created = service.create({
      title: 'Stardew Valley',
      description: 'Simulador de fazenda',
      genres: ['Simulação'],
      releaseDate: new Date('2016-02-26'),
      developer: 'ConcernedApe',
      rating: 9.2,
      price: 14.99,
    });

    service.remove(created.id);
    expect(() => service.findById(created.id)).toThrow();
  });
});
