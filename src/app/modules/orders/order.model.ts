import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      trim: true,
      required: [true, 'Please provide a valid email.'],
    },
    product: {
      type: String,
      trim: true,
      required: [true, 'Please provide a product id.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide exact quantity.'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please provide total price.'],
    },
    createdAt: {
      type: String,
      default: new Date(),
    },
    updatedAt: {
      type: String,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  },
);

const order = model<IOrder>('Order', orderSchema);

export default order;
