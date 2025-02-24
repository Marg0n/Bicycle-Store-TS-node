import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userController } from './user.controller';
import { userValidations } from './userValidation';
import auth from '../../middleware/auth';

const userRouter = Router();

// routes
userRouter.get(
  '/',
  auth('admin'),
  userController.getUser,
);
userRouter.post(
  '/createAdmin',
  auth('admin'),
  userController.createAdmin,
);
userRouter.post(
  '/register',
  validateRequest(userValidations.userValidationSchema),
  userController.registerUser,
);

export default userRouter;
