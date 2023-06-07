import { ProductModel } from "../dao/models/products.models.js";

class ProductService {
  async getAllProducts() {
    try {
      const products = await ProductModel.find({});
      return products; /* .docs.map(product => product.toObject()); */
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      const product = await ProductModel.create(productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId, productData) {
    try {
      if (!productId) {
        throw new Error("invalid id");
      }
      const product = await ProductModel.findByIdAndUpdate(
        productId,
        productData
        /* { new: true } */
      );
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const product = await ProductModel.findByIdAndDelete(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
