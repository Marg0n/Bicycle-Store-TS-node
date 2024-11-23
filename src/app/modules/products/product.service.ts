import { IProduct } from "./product.interface";
import product from "./product.model";

// create a new product
const createProduct = async function(productData: IProduct): Promise<IProduct> {
    
    const result = await product.create(productData);

    return result;
}

// get products
const getProduct = async function() {
    
    const result = await product.find();

    return result;
}

// get a products
const getOneProduct = async function(id: string) {
    
    const result = await product.findById(id);

    return result;
}

// update a products
const updateProduct = async function(id: string, productData: IProduct) {
    
    const result = await product.findByIdAndUpdate(id, productData);

    return result;
}

// delete a products
const deleteProduct = async function(id: string) {
    
    const result = await product.findByIdAndDelete(id);

    return result;
}

export const productService = {
    createProduct,
    getProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
}