import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter.post('/createProduct', productController.createProduct)

export default productRouter;