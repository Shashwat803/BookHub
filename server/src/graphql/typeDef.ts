const typeDefs = `
 scalar Upload

 
type Response {
  success: Boolean!
  message: String!
}


type AuthorResult {
  authors: [Author]
  totalAuthors: Int
  totalPages: Int
  currentPage: Int
}

type BookResult {
  books: [Book]
  totalBooks: Int
  totalPages: Int
  currentPage: Int
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
   getAuthors(
    limit: Int
    pageNumber: Int
    searchQuery: String
  ): AuthorResult

    getBooks(
    limit: Int
    pageNumber: Int
    searchQuery: String
  ): BookResult
  
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
