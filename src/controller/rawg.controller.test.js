import rawgController from './rawg.controller.js';
import gameService from '../services/game.service.js';
import { fetchGamesFromRawg } from '../services/rawg.service.js';

jest.mock('../services/game.service.js');
jest.mock('../services/rawg.service.js', () => ({
  fetchGamesFromRawg: jest.fn(),
}));

describe('rawgController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve retornar 201 e o jogo criado', async () => {
      const fakeGame = { id: 1, title: 'Jogo Teste' };
      gameService.createGame.mockResolvedValue(fakeGame);

      await rawgController.create(req, res);

      expect(gameService.createGame).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(fakeGame);
    });

    it('deve retornar 500 em caso de erro', async () => {
      gameService.createGame.mockRejectedValue(new Error('Erro'));

      await rawgController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao criar jogo.' });
    });
  });

  describe('getAll', () => {
    it('deve retornar 200 e a lista de jogos', async () => {
      const fakeGames = [{ id: 1, title: 'Jogo 1' }];
      gameService.getAllGames.mockResolvedValue(fakeGames);

      await rawgController.getAll(req, res);

      expect(gameService.getAllGames).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeGames);
    });

    it('deve retornar 500 em caso de erro', async () => {
      gameService.getAllGames.mockRejectedValue(new Error('Erro'));

      await rawgController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Erro ao buscar jogos.' });
    });
  });

  
});