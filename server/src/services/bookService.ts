import { Op } from "sequelize";
import Book from "../models/Book";
import Author from "../models/Author";
import { saveImage } from "../helper/saveImage";

export default {
  getBooks: async (
    limit: number = 10,
    pageNumber: number = 1,
    searchQuery?: string
  ) => {
    try {
      const offset = (pageNumber - 1) * limit;
      const whereQuery: any = {};

      if (searchQuery) {
        whereQuery[Op.or] = [
          { title: { [Op.iLike]: `%${searchQuery}%` } },
          { publishedDate: { [Op.iLike]: `%${searchQuery}%` } },
        ];
      }
      const books = await Book.findAll({
        include: [{ model: Author }],
        where: whereQuery,
        offset,
        limit,
      });
      return books;
    } catch (error) {
      throw new Error("Error while fetching books");
    }
  },

  createBook: async ({
    bookId,
    title,
    description,
    publishedDate,
    authorId,
    coverImage,
  }: {
    bookId?: number;
    title: string;
    description: string;
    publishedDate: string;
    authorId: number;
    coverImage?: any;
  }) => {
    try {
      if ([title, description, publishedDate].some((item) => item.trim() === "")) {
        throw new Error("Title, description, and published date are mandatory");
      }
      if (!authorId) {
        throw new Error("Author is not selected");
      }
  
      let imagePath = null;
      if (coverImage) {
        imagePath = await saveImage(coverImage);
      }
  
      if (bookId && bookId > 0) {
        const updateData: {
          title: string;
          description: string;
          publishedDate: string;
          authorId: number;
          coverImage?: string;
        } = {
          title,
          description,
          publishedDate,
          authorId,
        };
  
        if (imagePath) {
          updateData.coverImage = imagePath;
        }
  
        const [updated] = await Book.update(updateData, { where: { bookId } });
  
        if (updated) {
          const updatedBook = await Book.findByPk(bookId);
          return updatedBook;
        } else {
          throw new Error("Book not found or no changes made");
        }
      } else {
        const newBook = await Book.create({
          title,
          description,
          publishedDate,
          authorId,
          coverImage: imagePath,
        });
        return newBook;
      }
    } catch (error) {
      console.error("Error in createBook:", error);
      throw new Error("Error while creating or updating book");
    }
  },
deleteBook: async (bookId: number) => {
    try {
      if (!bookId) {
        throw new Error("bookId is missing");
      }
      await Book.destroy({ where: { bookId } });

      return { success: true, message: "Book deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error while deleting book" };
    }
  },
};
