// request & response management

import { Request, Response } from 'express';
import product from './product.model';

//  create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = await req.body;

    const result = await product.create(productData);

    res.status(200).send({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } 
  catch (err: any) {
    // console.log(err);
    res.status(500).send({
      message: 'Something went wrong while creating Product! Validation failed!',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

// get all products
const getProduct = async (req: Request, res: Response) => {
  try {
    const productData = await req.body;

    const result = await product.create(productData);

    res.status(200).send({
      message: "Bicycle getting info successful! ",
      success: true,
      data: result,
    });
  } 
  catch (err: any) {
    // console.log(err);
    res.status(500).send({
      message: 'Something went wrong while getting Product!',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

export const productController = {
  createProduct,
  getProduct,
};
