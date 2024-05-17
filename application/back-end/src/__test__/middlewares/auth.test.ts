import { AuthMiddleware } from '@middlewares/auth.middleware';
import { getMockRes, getMockReq } from '@jest-mock/express';
import { sessionRepositoryMock, userRepositoryMock } from '#mock';
import { UnauthorizedError, UnexpectedError } from '#error';

const { res, next, mockClear } = getMockRes();

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;

  beforeEach(() => {
    mockClear();
    authMiddleware = new AuthMiddleware(sessionRepositoryMock, userRepositoryMock);
  });

  describe('extractToken', () => {
    it('should return token when token is provided', () => {
      const EXPECTED_TOKEN = 'token';
      const req = getMockReq({ headers: { authorization: `Bearer ${EXPECTED_TOKEN}` } });

      const result = authMiddleware.extractToken(req, next);

      expect(result).toEqual(EXPECTED_TOKEN);
    });

    it('should call next with UnauthorizedError when no token is provided', () => {
      const req = getMockReq({ headers: { authorization: '' } });

      authMiddleware.extractToken(req, next);

      expect(next).toHaveBeenCalledWith(new UnauthorizedError({ detail: 'no token provided' }));
    });

    it('should return null when no token is provided', () => {
      const req = getMockReq({ headers: { authorization: '' } });

      const result = authMiddleware.extractToken(req, next);

      expect(result).toBeNull();
    });
  });

  describe('authenticate', () => {
    it('should call next with UnauthorizedError when no session is found', async () => {
      const req = getMockReq({ headers: { authorization: 'Bearer token' } });
      sessionRepositoryMock.getSessionsByToken.mockResolvedValue([]);

      await authMiddleware.authenticate(req, res, next);

      expect(next).toHaveBeenCalledWith(new UnauthorizedError({ detail: 'no session found' }));
    });

    it('should call next with UnexpectedError when token is invalid', async () => {
      const req = getMockReq({ headers: { authorization: 'Bearer token' } });

      sessionRepositoryMock.getSessionsByToken.mockRejectedValue(new Error());

      await authMiddleware.authenticate(req, res, next);

      expect(next).toHaveBeenCalledWith(new UnexpectedError({ detail: 'invalid token' }));
    });

    it('should call next when session is found', async () => {
      const req = getMockReq({ headers: { authorization: 'Bearer token' } });
      sessionRepositoryMock.getSessionsByToken.mockResolvedValue([{ userId: 1 }]);

      await authMiddleware.authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('admin', () => {
    it('should call next with UnauthorizedError when user is not an admin', async () => {
      const req = getMockReq({ headers: { authorization: 'Bearer token' } });

      sessionRepositoryMock.getSessionsByToken.mockResolvedValue([{ userId: 1 }]);
      userRepositoryMock.getUserRole.mockResolvedValue('USER');

      await authMiddleware.admin(req, res, next);

      expect(next).toHaveBeenCalledWith(new UnauthorizedError({ detail: 'user is not an admin' }));
    });

    it('should call next with user is admin', async () => {
      const req = getMockReq({ headers: { authorization: 'Bearer token' } });

      sessionRepositoryMock.getSessionsByToken.mockResolvedValue([{ userId: 1 }]);
      userRepositoryMock.getUserRole.mockResolvedValue('ADMIN');

      await authMiddleware.admin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
