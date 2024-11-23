// const express = require("express");
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import productRouter from './app/modules/products/product.router';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// middleware
app.use('/api/v1/product', productRouter)

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

export default app;
