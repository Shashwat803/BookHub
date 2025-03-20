const typeDefs = `
 scalar Upload

 
type Response {
  success: Boolean!
  message: String!
}

type AuthorNameList{
    authorId: Int!
    name: String!
}

  type Author {
    authorId: Int!
    name: String!
    biography: String!
    bornDate: String!
    image: String
    books: [Book]
  }

  type Book {
    bookId: Int!
    title: String!
    description: String!
    publishedDate: String!
    coverImage: String
    Author: Author
  }

  type Query {
    getAuthors(limit: Int, pageNumber: Int, searchQuery: String): [Author]
    getBooks(limit: Int, pageNumber: Int, searchQuery: String): [Book]
    getAuthorNameList: [AuthorNameList]
  }

  type Mutation {
    createAuthor(
     authorId:Int
      name: String!
      biography: String!
      bornDate: String!
      image: Upload
    ): Author

    createBook(
      bookId:Int
      title: String!
      description: String!
      publishedDate: String!
      authorId: Int!
      coverImage: Upload
    ): Book

  deleteAuthor(authorId: Int!):Response
  deleteBook(bookId: Int!): Response 
  }
`;

export default typeDefs;
