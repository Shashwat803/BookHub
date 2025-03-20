import authorService from "../services/authorService";
import bookService from "../services/bookService";
import { GraphQLUpload } from "graphql-upload-ts";

interface Author {
  name: string;
  biography: string;
  bornDate: string;
  image: string;
}

interface Book {
  title: string;
  description: string;
  publishedDate: string;
  authorId: number;
  coverImage: string;
}

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getAuthorNameList: async () => {
      return await authorService.getAuthorNameList();
    },
    getAuthors: async (
      _: any,
      {
        limit,
        pageNumber,
        searchQuery,
      }: { limit: number; pageNumber: number; searchQuery?: string }
    ) => {
      return await authorService.getAuthors(limit, pageNumber, searchQuery);
    },
    getBooks: async (
      _: any,
      {
        limit,
        pageNumber,
        searchQuery,
      }: { limit: number; pageNumber: number; searchQuery?: string }
    ) => {
      return await bookService.getBooks(limit, pageNumber, searchQuery);
    },
  },
  Mutation: {
   createAuthor: async (_: any, args: Author) => {
      return await authorService.createAuthor(args);
    },
    createBook: async (_: any, args: Book) => {
      return await bookService.createBook(args);
    },
    deleteAuthor: async (_: any, args: { authorId: number }) => {
      return await authorService.deleteAuthor(args.authorId);
    },
    deleteBook: async (_: any, args: { bookId: number }) => {
      return await bookService.deleteBook(args.bookId);
    },
  },
};

export default resolvers;
