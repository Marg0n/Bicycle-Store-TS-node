import product from '../products/product.model';
import { IOrder } from './order.interface';
import order from './order.model';

// order a bicycle
const orderCycle = async function (orderData: IOrder): Promise<IOrder> {
  const { product: productId, quantity } = orderData;

  // Find the product
  const productData = await product.findById(productId);

  if (!productData) {
    throw new Error('Product not found');
  }

  // Check if sufficient stock is available
  if (productData.quantity < quantity) {
    throw new Error('Insufficient stock');
  }

  // Reduce the quantity
  productData.quantity -= quantity;

  // Update the inStock status
  if (productData.quantity === 0) {
    productData.inStock = false;
  }

  // Save the updated product
  await productData.save();

  // Create and save the order
  const result = await order.create(orderData);

  return result;
};

export const orderService = {
  orderCycle,
};
