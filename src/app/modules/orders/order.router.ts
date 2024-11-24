import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter = Router();

orderRouter.post('/orders', orderController.orderProduct);

export default orderRouter;