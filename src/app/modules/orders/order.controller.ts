import { Request, Response } from 'express';
import { orderService } from './order.service';

//  create a new order
const orderProduct = async (req: Request, res: Response) => {
  try {
    const orderData = await req.body;

    const result = await orderService.orderCycle(orderData);

    res.status(200).send({
      message: 'Bicycle created successfully!',
      success: true,
      data: result,
    });
  } 
  catch (err: any) {
    if (err.message === 'Insufficient stock') {
      res.status(400).send({
        message: 'Insufficient stock for the product!',
        success: false,
        error: err.message,
        stack: err.stack,
      });
    } else {
      res.status(500).send({
        message: 'Something went wrong with Validation while creating Product Order!',
        success: false,
        error: err.message || err,
        stack: err.stack,
      });
    }
  }
};

// Calculate total revenue
const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderService.calculateRevenue();

    res.status(200).send({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue }
    });
  } 
  catch (err: any) {
    res.status(500).send({
      message: 'Something went wrong while calculating revenue!',
      success: false,
      error: err.message || err,
      stack: err.stack
    });
  }
};

export const orderController = {
  orderProduct,
  getRevenue,
};
