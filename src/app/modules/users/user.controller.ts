/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { userService } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import globalErrorHandler from '../../middleware/globalErrorHandler';
import catchAsync from '../../../utils/catchAsync';

// register a user
const registerUser = catchAsync(async function (req, res) {
  const user = await req.body;

  const result = await userService.registerUser(user);

  sendResponse(res, {
    message: 'User registered successfully',
    statusCode: HttpStatus.CREATED,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});

// get all users
const getUser = catchAsync(async function (req, res) {

    const user = await userService.getUser();

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User fetch successful',
      statusCode: HttpStatus.OK,
      data: {
        user: user,
      },
    });
});

// create an admin user
const createAdmin = catchAsync(async function (req, res) {
  const admin = await req.body;

  const result = await userService.createAdmin(admin);

  sendResponse(res, {
    message: 'Admin created successfully',
    statusCode: HttpStatus.CREATED,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
    },
  });
});


export const userController = {
  registerUser,
  getUser,
  createAdmin,
};
