// lib/backend/controllers/productController.ts
import Product from '../models/Product';

export const getAllProducts = async () => {
    return await Product.find();
};

export const createProduct = async (data: any) => {
    const product = new Product(data);
    return await product.save();
};
