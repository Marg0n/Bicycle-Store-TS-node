import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        trim: true,
        unique: true,
        minlength: 2,
        MaxLength:40,
        required: [true, 'Please provide a unique model name.'],
    },
    brand: {
        type: String,
        trim: true,
        required: [true, 'Please provide a brand name.'],
    },
    type: {
        type: String,
        trim: true,
        enum: {values:['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],message: '{VALUE} is not valid. Please provide a valid type.'},
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
})

// pre save middleware / hooks
productSchema.pre('save', function(){
    console.log(this,'--pre save!--')
})

// post save middleware / hooks
productSchema.post('save', function(){
    console.log(this,'--post save!--')
})

const product = model("Product", productSchema);

export default product;