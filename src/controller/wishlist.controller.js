import wishlistService from '../services/wishlist.service.js';
import Wishlist from '../models/Wishlist.js';

const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlistByUser(req.userId);
    res.status(200).json(wishlist || { games: [] });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar wishlist.' });
  }
};

const addGame = async (req, res) => {
  const { rawgId } = req.body;
  const userId = req.userId;
  if (!rawgId) return res.status(400).json({ message: 'rawgId é obrigatório.' });
  try {
    const wishlist = await wishlistService.addGameToWishlist(userId, rawgId);
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar jogo à wishlist.' });
  }
};

const removeGame = async (req, res) => {
  const { rawgId } = req.body;
  const userId = req.userId;
  if (!rawgId) return res.status(400).json({ message: 'rawgId é obrigatório.' });
  try {
    const wishlist = await wishlistService.removeGameFromWishlist(userId, rawgId);
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover jogo da wishlist.' });
  }
};

export default { getWishlist, addGame, removeGame };