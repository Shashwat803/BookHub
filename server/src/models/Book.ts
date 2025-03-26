import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/db";
import Author from "./Author";

export default class Book extends Model {
}

Book.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Author.hasMany(Book, { foreignKey: "authorId" }),
  Book.belongsTo(Author, { foreignKey: "authorId" });
