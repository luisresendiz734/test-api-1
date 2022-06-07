import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://cftohuex:mMZfA4--wrLtwVTyVFCJMx0GeIbVmOxM@heffalump.db.elephantsql.com/cftohuex"
);

export default sequelize;
