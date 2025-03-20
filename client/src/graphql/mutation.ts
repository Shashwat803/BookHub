import { gql } from "@apollo/client";

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor(
    $authorId: Int
    $name: String!
    $biography: String!
    $bornDate: String!
    $image: Upload
  ) {
    createAuthor(
      authorId: $authorId
      name: $name
      biography: $biography
      bornDate: $bornDate
      image: $image
    ) {
      authorId
      name
      biography
      bornDate
      image
    }
  }
`;

// Mutation to create a book
export const CREATE_BOOK = gql`
  mutation CreateBook(
    $bookId: Int
    $title: String!
    $description: String!
    $publishedDate: String!
    $authorId: Int!
    $coverImage: Upload
  ) {
    createBook(
      bookId: $bookId
      title: $title
      description: $description
      publishedDate: $publishedDate
      authorId: $authorId
      coverImage: $coverImage
    ) {
      bookId
      title
    }
  }
`;

// Mutation to delete an author
export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($authorId: Int!) {
    deleteAuthor(authorId: $authorId) {
      success
      message
    }
  }
`;

// Mutation to delete a book
export const DELETE_BOOK = gql`
  mutation DeleteBook($bookId: Int!) {
    deleteBook(bookId: $bookId) {
      success
      message
    }
  }
`;
