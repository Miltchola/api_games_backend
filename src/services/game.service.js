import Game from '../models/Game.js';

const createGame = async (data) => await Game.create(data);
const getAllGames = async () => await Game.find();

export default { createGame, getAllGames };