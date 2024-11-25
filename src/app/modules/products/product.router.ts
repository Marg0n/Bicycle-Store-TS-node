import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter.get('/:productId', productController.getOneProduct);
productRouter.put('/:productId', productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);
productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getProduct);

export default productRouter;