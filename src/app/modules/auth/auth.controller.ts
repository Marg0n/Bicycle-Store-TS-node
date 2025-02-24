import { Request, Response } from 'express';
import { authService } from './auth.service';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import HttpStatus from 'http-status-codes';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: HttpStatus.CREATED,
    data: result,
  })
});

export const authController = {
  register,
};
