import { Request, Response } from "express";
import { orderService } from "./order.service";

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

export const orderController = {
    orderProduct,
  };