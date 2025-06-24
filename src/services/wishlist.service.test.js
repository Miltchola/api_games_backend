import Wishlist from '../models/Wishlist.js';
import wishlistService from './wishlist.service.js';

jest.mock('../models/Wishlist.js');

describe('wishlistService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar a wishlist de um usuário com getWishlistByUser', async () => {
    const userId = 'user1';
    const wishlist = { userId, games: [12345] };
    Wishlist.findOne.mockResolvedValue(wishlist);

    const result = await wishlistService.getWishlistByUser(userId);

    expect(Wishlist.findOne).toHaveBeenCalledWith({ userId });
    expect(result).toEqual([12345]);
  });

  it('deve adicionar um jogo a uma nova wishlist com addGameToWishlist', async () => {
    const userId = 'user2';
    const rawgId = 54321;
    Wishlist.findOne.mockResolvedValue(null);
    const saveMock = jest.fn().mockResolvedValue('savedWishlist');
    Wishlist.mockImplementation(() => ({ userId, games: [rawgId], save: saveMock }));

    const result = await wishlistService.addGameToWishlist(userId, rawgId);

    expect(Wishlist.findOne).toHaveBeenCalledWith({ userId });
    expect(saveMock).toHaveBeenCalled();
    expect(result).toBe('savedWishlist');
  });

  it('deve adicionar um jogo a uma wishlist existente se não estiver presente', async () => {
    const userId = 'user3';
    const rawgId = 12345;
    const saveMock = jest.fn().mockResolvedValue('savedWishlist');
    const wishlist = { userId, games: [], save: saveMock };
    Wishlist.findOne.mockResolvedValue(wishlist);

    const result = await wishlistService.addGameToWishlist(userId, rawgId);

    expect(wishlist.games).toContain(rawgId);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toBe('savedWishlist');
  });

  it('não deve adicionar um jogo já existente na wishlist', async () => {
    const userId = 'user4';
    const rawgId = 1234;
    const saveMock = jest.fn().mockResolvedValue('savedWishlist');
    const wishlist = { userId, games: [rawgId], save: saveMock };
    Wishlist.findOne.mockResolvedValue(wishlist);

    const result = await wishlistService.addGameToWishlist(userId, rawgId);

    expect(wishlist.games).toEqual([rawgId]);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toBe('savedWishlist');
  });

  it('deve remover um jogo da wishlist com removeGameFromWishlist', async () => {
    const userId = 'user5';
    const rawgId = 12345;
    const saveMock = jest.fn().mockResolvedValue('savedWishlist');
    const wishlist = { userId, games: [rawgId, 67890], save: saveMock };
    Wishlist.findOne.mockResolvedValue(wishlist);

    const result = await wishlistService.removeGameFromWishlist(userId, rawgId);

    expect(wishlist.games).not.toContain(rawgId);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toBe('savedWishlist');
  });

  it('deve retornar null ao tentar remover de uma wishlist inexistente', async () => {
    Wishlist.findOne.mockResolvedValue(null);

    const result = await wishlistService.removeGameFromWishlist('user6', 1234);

    expect(result).toBeNull();
  });
});