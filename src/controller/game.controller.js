import gameService from '../services/game.service.js';
import Game from '../models/Game.js'; // ajuste o caminho conforme sua estrutura

const create = async (req, res) => {
  try {
    const game = await gameService.createGame(req.body);
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar jogo.' });
  }
};

const getAll = async (req, res) => {
  try {
    const games = await gameService.getAllGames();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar jogos.' });
  }
};

const getByRawgId = async (req, res) => {
  try {
    const rawgId = Number(req.params.rawgId);
    if (isNaN(rawgId)) {
      return res.status(400).json({ message: 'Parâmetro rawgId inválido.' });
    }
    const game = await gameService.getGameByRawgId(rawgId);
    if (!game) {
      return res.status(404).json({ message: 'Jogo não encontrado.' });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar jogo.' });
  }
};

export default { create, getAll, getByRawgId };