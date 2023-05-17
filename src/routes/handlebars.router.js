import express from "express";
 import { ProductManager } from "../productManager";
const dataProd = new ProductManager("./src/product.json");
export const fixedProductRoutes = express.Router();
fixedProductRoutes.get("/", async (req, res) => {
  try {
    const products = await dataProd.getProducts();

    return res.render("home", products);
  } catch (error) {
    res.status(500).json({ succes: "false", msg: "error" });
  }
}); 