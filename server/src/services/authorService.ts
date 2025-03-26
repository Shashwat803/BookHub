import { Op } from "sequelize";
import Author from "../models/Author";
import fs from "fs";
import path from "path";
import { saveImage } from "../helper/saveImage";

export default {
  getAuthorNameList: async () => {
    try {
      const authors = await Author.findAll({
        attributes: ["authorId", "name"],
      });
      return authors;
    } catch (error) {
      throw new Error("Error while fetching author");
    }
  },

  getAuthors: async (
    limit: number = 10,
    pageNumber: number = 1,
    searchQuery?: string
  ) => {
    try {
      const offset = (pageNumber - 1) * limit;
      const whereQuery: any = {};

      if (searchQuery) {
        whereQuery[Op.or] = [
          { name: { [Op.iLike]: `%${searchQuery}%` } },
          { bornDate: { [Op.iLike]: `%${searchQuery}%` } },
        ];
      }

      const authors = await Author.findAll({
        where: whereQuery,
        offset: offset,
        limit: limit,
        order: [["authorId", "DESC"]],
      });
    
      const totalAuthors = await Author.count({ where: whereQuery })
      return {
        authors,
        totalAuthors,
        totalPages: Math.ceil(totalAuthors / limit),
        currentPage: pageNumber,
      };
    } catch (error) {
      throw new Error("Error while fetching author");
    }
  },

  createAuthor: async ({
    authorId,
    name,
    biography,
    bornDate,
    image,
  }: {
    authorId?: number;
    name: string;
    biography: string;
    bornDate: string;
    image?: any;
  }) => {
    try {
      if ([name, biography, bornDate].some((item) => item.trim() === "")) {
        throw new Error("Name, biography, and born date are mandatory");
      }
  
      let imagePath = null;
      if (image) {
        imagePath = await saveImage(image);
      }
  
      if (authorId && authorId > 0) {
        const updateData: {
          name: string;
          biography: string;
          bornDate: string;
          image?: string;
        } = {
          name,
          biography,
          bornDate,
        };
  
        if (imagePath) {
          updateData.image = imagePath;
        }
  
        const [updated] = await Author.update(updateData, { where: { authorId } });
  
        if (updated) {
          const updatedAuthor = await Author.findByPk(authorId);
          return updatedAuthor;
        } else {
          throw new Error("Author not found or no changes made");
        }
      } else {
        const newAuthor = await Author.create({
          name,
          biography,
          bornDate,
          image: imagePath,
        });
        return newAuthor;
      }
    } catch (error) {
      console.error("Error in createAuthor:", error);
      throw new Error("Error while creating or updating author");
    }
  },
  deleteAuthor: async (authorId: number) => {
    try {
      if (!authorId) {
        throw new Error("AuthorId is missing");
      }

      await Author.destroy({ where: { authorId } });

      return { success: true, message: "Author deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error while deleting author" };
    }
  },
};
