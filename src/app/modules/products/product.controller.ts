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
      message: 'Bicycle retrieved successful! ',
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

// get a products
const getOneProduct = async (req: Request, res: Response) => {
  try {
    const productId = await req.params.productId;

    const result = await productService.getOneProduct(productId);

    res.status(200).send({
      message: 'Bicycle retrieved successful! ',
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

// update a products
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = await req.body;
    const productId = await req.params.productId;

    const result = await productService.updateProduct(productId, productData);

    res.status(200).send({
      message: 'Bicycle updated successful! ',
      success: true,
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).send({
      message: 'Something went wrong while updating Product!',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

// delete a products
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProduct();

    res.status(200).send({
      message: 'Bicycle deleted successful! ',
      success: true,
      data: result,
    });
  } catch (err: any) {
    // console.log(err);
    res.status(500).send({
      message: 'Something went wrong while deleting Product!',
      success: false,
      error: err.errors,
      stack: err.stack,
    });
  }
};

export const productController = {
  createProduct,
  getProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
