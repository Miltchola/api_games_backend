import Library from '../models/Library.js';

const getLibraryByUser = async (userId) => {
  const library = await Library.findOne({ userId });
  return library ? library.games : [];
};

const addGameToLibrary = async (userId, rawgId) => {
  let library = await Library.findOne({ userId });
  if (!library) {
    library = new Library({ userId, games: [rawgId] });
  } else if (!library.games.includes(rawgId)) {
    library.games.push(rawgId);
  }
  return library.save();
};

const removeGameFromLibrary = async (userId, rawgId) => {
  const library = await Library.findOne({ userId });
  if (!library) return null;
  library.games = library.games.filter(id => id !== rawgId);
  return library.save();
};

export default { getLibraryByUser, addGameToLibrary, removeGameFromLibrary };