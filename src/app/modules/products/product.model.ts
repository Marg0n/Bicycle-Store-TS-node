import { model, Schema } from "mongoose";

const productSchema = new Schema({
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
        enum: {values:[true, false], message: 'Please provide in stock is true or false.'},
        required: [true, 'Please provide in stock information.'],
    },
})

const product = model("Product", productSchema);

export default product;