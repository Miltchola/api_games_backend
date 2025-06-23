import libraryService from '../services/library.service.js';
import Library from '../models/Library.js';

const getLibrary = async (req, res) => {
  try {
    const library = await libraryService.getLibraryByUser(req.userId);
    res.status(200).json(library || { games: [] });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar library.' });
  }
};

const addGame = async (req, res) => {
  const { rawgId } = req.body;
  const userId = req.userId;
  if (!rawgId) return res.status(400).json({ message: 'rawgId é obrigatório.' });
  try {
    let library = await Library.findOne({ userId });
    if (!library) {
      library = new Library({ userId, games: [rawgId] });
    }
    if (!library.games) library.games = [];
    if (!library.games.includes(rawgId)) {
      library.games.push(rawgId);
    } else if (!library.games.includes(rawgId)) {
      library.games.push(rawgId);
    }
    await library.save();
    res.status(200).json(library);
  } catch (err) {
    console.error('Erro ao adicionar jogo à library:', err);
    res.status(500).json({ message: 'Erro ao adicionar jogo à library.' });
  }
};

const removeGame = async (req, res) => {
  const { rawgId } = req.body;
  const userId = req.userId;
  if (!rawgId) return res.status(400).json({ message: 'rawgId é obrigatório.' });
  try {
    let library = await Library.findOne({ userId });
    if (!library) {
      return res.status(404).json({ message: 'Library não encontrada.' });
    }
    if (!library.games) library.games = [];
    library.games = library.games.filter(id => id !== rawgId);
    await library.save();
    res.status(200).json(library);
  } catch (err) {
    console.error('Erro ao remover jogo da library:', err);
    res.status(500).json({ message: 'Erro ao remover jogo da library.' });
  }
};

export default { getLibrary, addGame, removeGame };