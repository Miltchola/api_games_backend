import mongoose from 'mongoose';
import Library from './Library.js';

describe('Library Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test_libraries', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Library.syncIndexes(); // <-- Add this line
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Library.deleteMany({});
  });

  it('deve criar uma biblioteca válida', async () => {
    const userId = new mongoose.Types.ObjectId();
    const rawgId1 = 12345;
    const rawgId2 = 67890;

    const library = new Library({
      userId,
      games: [rawgId1, rawgId2],
    });

    const savedLibrary = await library.save();

    expect(savedLibrary._id).toBeDefined();
    expect(savedLibrary.userId.toString()).toBe(userId.toString());
    expect(savedLibrary.games.length).toBe(2);
    expect(savedLibrary.games[0]).toBe(rawgId1);
   });

  it('deve exigir o campo userId', async () => {
    const library = new Library({ games: [] });
    let err;
    try {
      await library.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.userId).toBeDefined();
  });

  it('não deve permitir userId duplicado', async () => {
    const userId = new mongoose.Types.ObjectId();
    await Library.create({ userId, games: [] });

    let err;
    try {
      await Library.create({ userId, games: [] });
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000); // Duplicate key error code
  });
});