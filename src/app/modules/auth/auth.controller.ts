import { Request, Response } from 'express';
import { authService } from './auth.service';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import HttpStatus from 'http-status-codes';

// register a user
const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: HttpStatus.CREATED,
    data: result,
  });
});

// login a user
const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: HttpStatus.CREATED,
    token: result.token,
    data: result.user,
  });
});

export const authController = {
  register,
  login,
};
