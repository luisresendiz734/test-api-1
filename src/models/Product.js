import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

export default Product;
