import express from "express";
import morgan from "morgan";
import customerRouter from "./routes/customer";
import orderRouter from "./routes/orders";
import productRouter from "./routes/product";

const app = express();

app.set("PORT", process.env.PORT || 4000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);

export default app;
