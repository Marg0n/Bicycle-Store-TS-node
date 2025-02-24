import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './user.controller';
import { userValidations } from './userValidation';

const userRouter = Router();

// routes
userRouter.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  userController.registerUser,
);
userRouter.get(
  '/',
  // validateRequest(userValidations.userValidationSchema),
  userController.getUser,
);

export default userRouter;
