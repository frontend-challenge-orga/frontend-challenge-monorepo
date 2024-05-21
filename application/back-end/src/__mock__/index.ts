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

export const reqMock = jest.fn();
export const resMock = {
  status: jest.fn(),
  json: jest.fn(),
};
export const nextMock = jest.fn();
