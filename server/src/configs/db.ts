import { Sequelize } from "sequelize";


const sequelize = new Sequelize("bookhub", "postgres", "Shashwatm@1", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});


export default sequelize