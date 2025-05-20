import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  releaseDate: Date
});

const Game = mongoose.model('Game', gameSchema);
export default Game;