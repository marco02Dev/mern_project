import mongoose, {Document, Schema, Model } from "mongoose";

export interface ProductSchema extends Document {
    name: string,
    price: number,
    featuredImageUrl: string,
    category: string,
    tags?: string[]
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
    featuredImageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    }
}, {
    timestamps: true
}
);

const Product: Model<ProductSchema> = mongoose.model<ProductSchema>('Product', productSchema);

export default Product;