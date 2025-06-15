import Game from '../models/Game.js';

const createGame = async (data) => await Game.create(data);
const getAllGames = async () => await Game.find();
const getGameByRawgId = async (rawgId) => {
  return await Game.findOne({ rawgId });
};

export default { createGame, getAllGames, getGameByRawgId };