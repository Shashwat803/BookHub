import { Sequelize } from "sequelize";
require('dotenv').config()

console.log("DBNAME:", process.env.DBNAME);
console.log("USERNAME:", process.env.USER);
console.log("PASSWORD:", process.env.PASSWORD );
console.log("HOST:", process.env.HOST);

const sequelize = new Sequelize(process.env.DBNAME || "", process.env.USER || "", process.env.PASSWORD || "", {
  host: process.env.HOST || "",
  port: 5432,
  dialect: "postgres",
});


export default sequelize