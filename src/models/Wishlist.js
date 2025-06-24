import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  games: { type: [Number], default: [] } // Agora armazena rawgId
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;