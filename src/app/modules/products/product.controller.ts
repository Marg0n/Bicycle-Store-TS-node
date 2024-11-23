// request & response management

import { Request, Response } from 'express';
import product from './product.model';
import { productService } from './product.service';

//  create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = await req.body;

    const result = await productService.createProduct(productData);

    res.status(200).send({
      message: 'Bicycle created successfully!',
      success: true,
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).send({
      message: 'Something went wrong with Validation while creating Product!',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

// get all products
const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getProduct();

    res.status(200).send({
      message: 'Bicycle retrieved  successful! ',
      success: true,
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).send({
      message: 'Something went wrong while retrieving Product!',
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
