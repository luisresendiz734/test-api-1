import Customer from "../models/Customer";
import { Op } from "sequelize";

const getAllCustomers = async (req, res) => {
  try {
    const results = await Customer.findAll();
    res.json({ success: true, results });
  } catch (error) {
    console.log("getAllCustomers:", error);
    res.status(400).json({ success: "false", results: error.message });
  }
};

const getOneCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await Customer.findOne({
      where: {
        id: +id,
      },
    });
    res.json({
      success: results ? true : false,
      results: results ? results : `Customer with id ${id} not exist.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const createNewCustomer = async (req, res) => {
  try {
    const { name, age, house_type, city } = req.query;
    const ageInt = +age;

    if (
      typeof name !== "string" ||
      typeof ageInt !== "number" ||
      typeof house_type !== "string" ||
      typeof city !== "string" ||
      !name ||
      !age ||
      !house_type ||
      !city
    ) {
      throw new Error("Datos incorrectos");
    }

    const customer = Customer.build({
      name,
      age: ageInt,
      house_type,
      city,
    });

    await customer.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const cid = +id;
    if (!cid || typeof cid !== "number") throw new Error("Invalid ID");

    const { name, age, house_type, city } = req.body;

    const values = {};

    if (name) values.name = name;
    if (age && typeof +age === "number") values.age = +age;
    if (house_type) values.house_type = house_type;
    if (city) values.city = city;

    if (Object.keys(values).length === 0) {
      throw new Error("All fields are invalid");
    }

    await Customer.update(
      { ...values },
      {
        where: {
          id: cid,
        },
      }
    );
    res.json({
      success: true,
      results: `Customer with id: ${cid} was updated.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

const deleteCustomers = async (req, res) => {
  try {
    const { id } = req.params;
    const ids = id.split(",").map((id) => +id);
    ids.forEach((id) => {
      if (typeof id !== "number" || !id) throw new Error("Some ID is invalid");
    });

    await Customer.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    res.json({
      success: true,
      results: `Customer with ids: ${JSON.stringify(ids)} was deleted.`,
    });
  } catch (error) {
    res.status(400).json({ success: "false", results: error.message });
  }
};

export {
  getAllCustomers,
  getOneCustomer,
  createNewCustomer,
  updateCustomer,
  deleteCustomers,
};
