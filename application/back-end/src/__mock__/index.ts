export const sessionRepositoryMock = {
  getSessions: jest.fn(),
  getSessionsByUserId: jest.fn(),
  getSessionsByToken: jest.fn().mockResolvedValue([]),
};

export const userRepositoryMock = {
  getUsers: jest.fn(),
  getUserById: jest.fn(),
  getUserRole: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
};
