import app from "./app";
import sequelize from "./database/sequelize";

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const PORT = app.get("PORT");
    app.listen(PORT, () => console.log("Listen on port", PORT));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
