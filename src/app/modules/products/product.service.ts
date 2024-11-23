import { IProduct } from "./product.interface";
import product from "./product.model";

// create a new product
const createProduct = async function (productData: IProduct): Promise<IProduct> {
    
    const result = await product.create(productData);

    return result;
}

export const productService = {
    createProduct
}