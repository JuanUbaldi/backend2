import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true }
}, { versionKey: false });

productSchema.plugin(mongoosePaginate);

export const ProductModel = model('products', productSchema);