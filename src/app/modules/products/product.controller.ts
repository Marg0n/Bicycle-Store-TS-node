// request & response management

import { Request, Response } from 'express';
import product from './product.model';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = await req.body;

    const result = await product.create(productData);

    res.send({
      status: true,
      message: 'Product created successfully!',
      data: result,
    });
  } 
  catch (err) {
    console.log(err);
    res.send({
      status: false,
      message: err || 'Something went wrong while creating Product!',
    });
  }
};

export const productController = {
  createProduct,
};
