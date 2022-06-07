import Order from "../models/Order";
import Customer from "../models/Customer";
import Product from "../models/Product";

import { Op } from "sequelize";

const getAllProducts = async (req, res) => {
  try {
    const results = await Product.findAll();
    res.json({ success: true, results });
  } catch (error) {
    console.log("getAllProducts:", error);
    res.status(400).json({ success: "false", results: error.message });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Product.findOne({
      where: {
        id: +id,
      },
    });
    res.json({
      success: results ? true : false,
      results: results ? results : `Product with id ${id} not exist.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const createNewProduct = async (req, res) => {
  try {
    const { quantity, price, product } = req.query;

    const qInt = +quantity;
    const pInt = +price;

    if (
      typeof qInt !== "number" ||
      typeof pInt !== "number" ||
      typeof product !== "string" ||
      !qInt ||
      !pInt ||
      !product
    ) {
      throw new Error("Invalid values");
    }

    const product1 = Product.build({
      quantity: qInt,
      price: pInt,
      product,
    });

    await product1.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const cid = +id;
    if (!cid || typeof cid !== "number") throw new Error("Invalid ID");

    const { quantity, price, product } = req.body;

    const values = {};

    if (quantity) values.quantity = +quantity;
    if (price) values.price = price;
    if (product) values.product = product;

    if (Object.keys(values).length === 0) {
      throw new Error("All fields are invalid");
    }

    await Product.update(
      { ...values },
      {
        where: {
          id: cid,
        },
      }
    );
    res.json({
      success: true,
      results: `Product with id: ${cid} was updated.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const ids = id.split(",").map((id) => +id);
    ids.forEach((id) => {
      if (typeof id !== "number" || !id) throw new Error("Some ID is invalid");
    });

    await Product.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    res.json({
      success: true,
      results: `Product with ids: ${JSON.stringify(ids)} was deleted.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

export {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateProduct,
  deleteProducts,
};
