import Wishlist from '../models/Wishlist.js';

const getWishlistByUser = async (userId) => {
  const wishlist = await Wishlist.findOne({ userId });
  return wishlist ? wishlist.games : [];
};

const addGameToWishlist = async (userId, rawgId) => {
  let wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) {
    wishlist = new Wishlist({ userId, games: [rawgId] });
  } else if (!wishlist.games.includes(rawgId)) {
    wishlist.games.push(rawgId);
  }
  return wishlist.save();
};

const removeGameFromWishlist = async (userId, rawgId) => {
  const wishlist = await Wishlist.findOne({ userId });
  if (!wishlist) return null;
  wishlist.games = wishlist.games.filter(id => id !== rawgId);
  return wishlist.save();
};

export default { getWishlistByUser, addGameToWishlist, removeGameFromWishlist };