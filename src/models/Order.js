import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

export default Order;
