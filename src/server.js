import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { ProductManager } from "./productManager.js";
import viewsRouter from "./routes/views-router.js";
import { Server } from "socket.io";
import path from "path";
import http from "http";
import { __dirname, __filename } from "./utils.js";
import handlebars from "express-handlebars";

const productManager = new ProductManager("./src/product.json");

const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
const socketServer = new Server(httpServer);


//SOCKET
socketServer.on("connection", (socket) => {
  console.log(`New Client Connection with ID: ${socket.id}`);
  //BACK RECIBE
  socket.on("msg_from_client_to_server", async (newProduct) => {
    try {
      await productManager.addProduct(newProduct);
      const productList = await productManager.getProducts();
      //BACK EMITE
      socket.emit("updatedProducts", { productList });
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("deleteProduct", async (id) => {
    try {
      const parsedId = parseInt(id, 10);
      await productManager.deleteProduct(parsedId);
      socket.emit("productDeleted", {
        message: "Producto eliminado exitosamente",
      });
      const productList = await productManager.getProducts();
      socket.emit("updatedProducts", { productList });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      socket.emit("productDeleteError", {
        error: "Ocurrió un error al eliminar el producto",
      });
    }
  });
});

//middlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// rutas apiRest con json
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter);
app.use("/realTimeProducts", viewsRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
  });
});
