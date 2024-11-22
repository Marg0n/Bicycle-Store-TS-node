// const express = require("express");
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  try {
    res.send({
      status: true,
      message: 'Server is running! ⚡',
    });
  } 
  catch (err: any) {
    res.send({
      status: false,
      message: err || 'Something went wrong!',
    });
  }
});

export default app;
