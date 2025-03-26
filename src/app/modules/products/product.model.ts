import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      minlength: 2,
      MaxLength: 40,
      required: [true, 'Please provide a unique model name.'],
    },
    brand: {
      type: String,
      trim: true,
      required: [true, 'Please provide a brand name.'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide exact price.'],
      },
    type: {
      type: String,
      trim: true,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message: '{VALUE} is not valid. Please provide a valid type.',
      },
      required: [true, 'Please provide a valid type'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Please provide description.'],
    },
    image:{
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide exact quantity.'],
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating.'],
      min: [0, 'Rating cannot be less than 0.'],
      max: [5, 'Rating cannot be more than 5.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Please provide in stock is true or false.'],
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

// Middleware to update 'updatedAt' field before updating a document 
productSchema.pre('findOneAndUpdate', function(next) { 
  this.set({ 
    updatedAt: new Date() 
  }); 
  next(); 
});

const product = model<IProduct>('Product', productSchema);

export default product;
