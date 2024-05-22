import { app } from '@config/express.configuration';
import { inputValidation } from '@middlewares/input-validation.middleware';
import { USER_ENDPOINTS, PROTECTED_ENDPOINTS, updateUserSchema } from '@package/common';
import { type IUserService, UnexpectedError } from '@package/domain';
import type { Response, NextFunction } from 'express';

export const setupUserController = (userService: IUserService) => {
  app.get(USER_ENDPOINTS.GET_USERS, async (_, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(new UnexpectedError());
    }
  });

  app.get(
    PROTECTED_ENDPOINTS.AUTHENTICATED_ROUTE + USER_ENDPOINTS.GET_USER,
    async (req, res: Response, next: NextFunction) => {
      try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        next(new UnexpectedError());
      }
    },
  );

  app.patch(
    PROTECTED_ENDPOINTS.AUTHENTICATED_ROUTE + USER_ENDPOINTS.UPDATE_USER,
    inputValidation(updateUserSchema),
    async (req, res: Response, next: NextFunction) => {
      try {
        const user = await userService.updateUser(req.body);
        res.status(200).json(user);
      } catch (error) {
        next(new UnexpectedError());
      }
    },
  );

  app.delete(
    PROTECTED_ENDPOINTS.ADMIN_ROUTE + USER_ENDPOINTS.DELETE_USER,
    async (req, res: Response, next: NextFunction) => {
      try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted' });
      } catch (error) {
        next(new UnexpectedError());
      }
    },
  );
};
