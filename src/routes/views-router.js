import express from "express";
import { ProductManager } from "../dao/productManager.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/product.json");

viewsRouter.get("/", async (req, res) => {
  const prods = await productManager.getProducts();
  res.render("home", { prods });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const prods = await productManager.getProducts();
  res.render("realTimeProducts", { prods });
});

export default viewsRouter;
