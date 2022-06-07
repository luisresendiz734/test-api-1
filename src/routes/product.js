import { Router } from "express";
import {
  createNewProduct,
  deleteProducts,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/product";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getOneProduct);
productRouter.post("/", createNewProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProducts);

export default productRouter;
