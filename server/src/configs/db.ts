import { Sequelize } from "sequelize";
require('dotenv').config()

const sequelize = new Sequelize(process.env.DBNAME || "", process.env.USER || "", process.env.PASSWORD || "", {
  host: process.env.HOST || "",
  port: 5432,
  dialect: "postgres",
});


export default sequelize