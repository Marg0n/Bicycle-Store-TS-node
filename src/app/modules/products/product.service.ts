import { IProduct } from "./product.interface";
import product from "./product.model";

const createProduct = async function (productData: IProduct): Promise<IProduct> {
    
    const result = await product.create(productData);

    return result;
}

export const productService = {
    createProduct
}