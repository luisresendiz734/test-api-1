import { Router } from "express";
import {
  createNewOrder,
  deleteOrders,
  getAllOrders,
  getOneOrder,
  updateOrder,
} from "../controllers/order";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOneOrder);
orderRouter.post("/", createNewOrder);
orderRouter.patch("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrders);

export default orderRouter;
