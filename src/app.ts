// const express = require("express");
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true,
}));

// middleware
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      message: 'Server is running! ⚡',
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || 'Something went wrong!',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
});

// global error handler
app.use(globalErrorHandler);

// route not found
app.use('*', (req: Request, res: Response) => {
  res.status(HttpStatus.FORBIDDEN).send({
    success: false,
    message: 'Route not found!',
    status: HttpStatus.FORBIDDEN,
  });
});

// api not found
app.use(notFound);

export default app;
