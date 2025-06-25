import { fetchAndSaveReviewsFromRawg, getReviewsByGame, getReviewsByUser, getReviewsByRawgGameId } from '../services/review.service.js';
import Game from '../models/Game.js';
import { createLocalReview } from '../services/review.service.js';
import User from '../models/User.js';
import Review from '../models/Review.js';

const getReviewsForGame = async (req, res) => {
  const { gameId } = req.params;
  try {
    // Busca o Game local
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Game not found.' });

    // Importa e salva reviews da RAWG se necessário
    await fetchAndSaveReviewsFromRawg(game.rawgId);

    // Busca reviews locais
    const reviews = await getReviewsByGame(gameId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar reviews.', error: err.message });
  }
};

const getReviewsForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await getReviewsByUser(userId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar reviews do usuário.', error: err.message });
  }
};

const createReview = async (req, res) => {
  const { rawgGameId, text } = req.body;
  const userId = req.userId; // Supondo que você use autenticação JWT

  if (!rawgGameId || !text) {
    return res.status(400).json({ message: 'rawgGameId e text são obrigatórios.' });
  }

  try {
    // Busca o usuário para pegar o username
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    const username = user.username;

    const review = await createLocalReview({ userId, rawgGameId, text, username });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar review.', error: err.message });
  }
};

const importAllReviews = async (req, res) => {
  try {
    const games = await Game.find({ rawgId: { $exists: true } });
    for (const game of games) {
      await fetchAndSaveReviewsFromRawg(game.rawgId);
    }
    res.status(200).json({ message: 'Importação de reviews concluída.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao importar reviews.', error: err.message });
  }
};

const getReviewsForGameByRawgId = async (req, res) => {
  const { rawgId } = req.params;
  try {
    // Busca reviews pelo campo rawgGameId
    const reviews = await getReviewsByRawgGameId(rawgId);
    
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar reviews.', error: err.message });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId; // Supondo que você use autenticação JWT

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review não encontrada.' });
    }
    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar esta review.' });
    }
    await review.deleteOne();
    res.status(200).json({ message: 'Review deletada com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar review.', error: err.message });
  }
};

export default { 
  getReviewsForGame, 
  getReviewsForUser, 
  createReview, 
  importAllReviews,
  getReviewsForGameByRawgId,
  deleteReview
};