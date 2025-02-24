// const express = require("express");
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import productRouter from './app/modules/products/product.router';
import orderRouter from './app/modules/orders/order.router';
import HttpStatus from 'http-status-codes';
import notFound from './app/middleware/notFound';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// middleware
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter);


app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      message: 'Server is running! ⚡',
    });
  } 
  catch (err: any) {
    res.status(500).send({
      message: err.message || 'Something went wrong!',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
});

// route not found
app.use('*', (req: Request, res: Response) => {
  res.status(HttpStatus.FORBIDDEN).send({
    success: false,
    message: 'Route not found!',
    status: HttpStatus.FORBIDDEN,
  });
});

// not found
app.use(notFound);

export default app;
