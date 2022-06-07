import Order from "../models/Order";
import Customer from "../models/Customer";
import Product from "../models/Product";
import { Op } from "sequelize";

const getAllOrders = async (req, res) => {
  try {
    const results = await Order.findAll();
    res.json({ success: true, results });
  } catch (error) {
    console.log("getAllOrders:", error);
    res.status(400).json({ success: "false", results: error.message });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Order.findOne({
      where: {
        id: +id,
      },
    });
    res.json({
      success: results ? true : false,
      results: results ? results : `Order with id ${id} not exist.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const createNewOrder = async (req, res) => {
  try {
    const { customer_id, product_id, quantity } = req.query;
    const cidInt = +customer_id;
    const pidInt = +product_id;
    const qInt = +quantity;

    if (
      typeof cidInt !== "number" ||
      typeof pidInt !== "number" ||
      typeof qInt !== "number" ||
      !cidInt ||
      !pidInt ||
      !qInt
    ) {
      throw new Error("Datos incorrectos");
    }

    const cr = await Customer.findOne({
      where: {
        id: cidInt,
      },
    });

    if (!cr) throw new Error("Invalid customer ID");

    const pr = await Product.findOne({
      where: {
        id: pidInt,
      },
    });

    if (!pr) throw new Error("Invalid customer ID");

    const order = Order.build({
      customer_id: cidInt,
      product_id: pidInt,
      quantity: qInt,
      time: new Date(Date.now()),
    });

    await order.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const cid = +id;
    if (!cid || typeof cid !== "number") throw new Error("Invalid ID");

    const { customer_id, product_id, quantity } = req.body;

    const values = {};

    if (customer_id) values.customer_id = customer_id;
    if (product_id) values.product_id = product_id;
    if (quantity) values.quantity = quantity;

    if (Object.keys(values).length === 0) {
      throw new Error("All fields are invalid");
    }

    await Order.update(
      { ...values },
      {
        where: {
          id: cid,
        },
      }
    );
    res.json({
      success: true,
      results: `Order with id: ${cid} was updated.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const deleteOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const ids = id.split(",").map((id) => +id);
    ids.forEach((id) => {
      if (typeof id !== "number" || !id) throw new Error("Some ID is invalid");
    });

    await Order.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    res.json({
      success: true,
      results: `Order with ids: ${JSON.stringify(ids)} was deleted.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

export { getAllOrders, getOneOrder, createNewOrder, updateOrder, deleteOrders };
