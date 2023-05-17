
import express from "express";
import { ProductManager } from "../productManager";
const dataProd = new ProductManager("productsDB");
export const realTimeProducts = express.Router();

realTimeProducts.get("/", async (req, res, next) => {
  try {
    const products = await dataProd.getProducts();
    return res.render("realTimeProducts", { products: products });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Invalid input", data: {} });
  }
});
 