import { IProduct } from "./product.interface";
import product from "./product.model";

// create a new product
const createProduct = async function(productData: IProduct): Promise<IProduct> {
    
    const result = await product.create(productData);

    return result;
}

// get products
const getProduct = async function(searchTerm: any) {
    const filter: any = {};
    if (searchTerm) {
        for (const key in searchTerm) {
            filter[key] = { $regex: new RegExp(searchTerm[key], 'i') };
        }
    }
    const result = await product.find(filter);
    return result;
}

// get a products
const getOneProduct = async function(id: string) {
    
    const result = await product.findById(id);

    return result;
}

// update a products
const updateProduct = async function(id: string, productData: IProduct) {
    
    const result = await product.findByIdAndUpdate(id, productData, {new: true});

    return result;
}

// delete a products
const deleteProduct = async function(id: string) {
    
    const result = await product.findByIdAndDelete(id, {new: true});

    return result;
}

export const productService = {
    createProduct,
    getProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
}