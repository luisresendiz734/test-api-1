import { Router } from "express";
import {
  createNewCustomer,
  deleteCustomers,
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
} from "../controllers/customer";

const customerRouter = Router();

customerRouter.get("/", getAllCustomers);
customerRouter.get("/:id", getOneCustomer);
customerRouter.post("/", createNewCustomer);
customerRouter.patch("/:id", updateCustomer);
customerRouter.delete("/:id", deleteCustomers);

export default customerRouter;
