import express from "express";
import { handlebars } from "express-handlebars";
import { Server } from "socket.io";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/cart.router.js";

import { realTimeProducts } from "./routes/realTimeProducts.router.js";
import { fixedProductRoutes } from "./routes/handlebars.router.js";

import path from "path";
import { __dirname } from "./utils.js";
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

//engine handlebars para las plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", fixedProductRoutes);
app.use("/realTimeProducts", realTimeProducts);
app.get("*"),
  (req, res, next) => {
    res.status(404).json({ status: "error", msg: "Not Found", data: {} });
  };
