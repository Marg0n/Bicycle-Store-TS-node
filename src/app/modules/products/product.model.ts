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
    quantity: {
      type: Number,
      required: [true, 'Please provide exact quantity.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'Please provide in stock is true or false.'],
    },
    createdAt: {
      type: String,
      // default: new Date(),
      default: Date.now,
    },
    updatedAt: {
      type: String,
      // default: new Date(),
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

// pre find middleware / hooks
productSchema.pre('find', function (next) {
  // console.log(this,'--pre save!--')
  next();
});

// post save middleware / hooks
productSchema.post('save', function (doc, next) {
  // console.log(doc,'--post save!--')
  next();
});

// Middleware to update 'updatedAt' field before updating a document 
productSchema.pre('findOneAndUpdate', function(next) { 
  this.set({ 
    updatedAt: new Date() 
  }); 
  next(); 
});

const product = model<IProduct>('Product', productSchema);

export default product;
