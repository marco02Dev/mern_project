import mongoose, { Document, Schema, Model } from "mongoose";

export interface ProductSchema extends Document {
    name: string,
    price: number,
    category: string,
    tags?: string[],
    details?: Array<{ title: string, content: string }>
}

const productSchema: Schema<ProductSchema> = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    details: {
        type: [{
            title: String,
            content: String
        }],
        required: false  // Se non obbligatorio
    }
}, {
    timestamps: true
});

const Product: Model<ProductSchema> = mongoose.model<ProductSchema>('Product', productSchema);

export default Product;
