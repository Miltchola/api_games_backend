import Library from '../models/Library.js';
import libraryService from './library.service.js';

jest.mock('../models/Library.js');

describe('libraryService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar a biblioteca de um usuário com getLibraryByUser', async () => {
    const userId = 'user1';
    const library = { userId, games: [12345] };
    Library.findOne.mockResolvedValue(library);
    const result = await libraryService.getLibraryByUser(userId);
    expect(Library.findOne).toHaveBeenCalledWith({ userId });
    expect(result).toEqual([12345]);
  });

  it('deve adicionar um jogo a uma nova biblioteca com addGameToLibrary', async () => {
    const userId = 'user2';
    const rawgId = 54321;
    Library.findOne.mockResolvedValue(null);
    const saveMock = jest.fn().mockResolvedValue('savedLibrary');
    Library.mockImplementation(() => ({ userId, games: [rawgId], save: saveMock }));

    const result = await libraryService.addGameToLibrary(userId, rawgId);

    expect(Library.findOne).toHaveBeenCalledWith({ userId });
    expect(saveMock).toHaveBeenCalled();
    expect(result).toBe('savedLibrary');
  });

it('deve adicionar um jogo a uma biblioteca existente se não estiver presente', async () => {
  const userId = 'user3';
  const rawgId = 12345;
  const saveMock = jest.fn().mockResolvedValue('savedLibrary');
  const library = { userId, games: [], save: saveMock };
  Library.findOne.mockResolvedValue(library);

  const result = await libraryService.addGameToLibrary(userId, rawgId);

  expect(Library.findOne).toHaveBeenCalledWith({ userId });
  expect(library.games).toContain(rawgId);
  expect(saveMock).toHaveBeenCalled();
  expect(result).toBe('savedLibrary');
});

it('não deve adicionar um jogo já existente na biblioteca', async () => {
  const userId = 'user4';
  const rawgId = 1234;
  const saveMock = jest.fn().mockResolvedValue('savedLibrary');
  const library = { userId, games: [rawgId], save: saveMock };
  Library.findOne.mockResolvedValue(library);

  const result = await libraryService.addGameToLibrary(userId, rawgId);

  expect(Library.findOne).toHaveBeenCalledWith({ userId });
  expect(library.games).toContain(rawgId);
  expect(saveMock).toHaveBeenCalled();
  expect(result).toBe('savedLibrary');
});

it('deve remover um jogo da biblioteca com removeGameFromLibrary', async () => {
  const userId = 'user5';
  const rawgId = 12345;
  const saveMock = jest.fn().mockResolvedValue('savedLibrary');
  const library = { userId, games: [rawgId, 67890], save: saveMock };
  Library.findOne.mockResolvedValue(library);

  const result = await libraryService.removeGameFromLibrary(userId, rawgId);

  expect(Library.findOne).toHaveBeenCalledWith({ userId });
  expect(library.games).not.toContain(rawgId);
  expect(saveMock).toHaveBeenCalled();
  expect(result).toBe('savedLibrary');
});

  it('deve retornar null ao tentar remover de uma biblioteca inexistente', async () => {
    Library.findOne.mockResolvedValue(null);

    const result = await libraryService.removeGameFromLibrary('user6', 1234);

    expect(result).toBeNull();
  });
});