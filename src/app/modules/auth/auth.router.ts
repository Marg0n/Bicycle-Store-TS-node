import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middleware/validateRequest';
import { authValidation } from './auth.validation';
import { userValidations } from '../users/userValidation';

const authRouter = Router();

authRouter.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  authController.register,
);
authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);
authRouter.post(
  '/refreshToken',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);

export default authRouter;
