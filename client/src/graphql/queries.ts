import { gql } from "@apollo/client";

export const Get_AuthorNameList = gql`
query GetAuthorNameList{
getAuthorNameList{
authorId
name
}
}
`;

export const Get_Authors = gql`
  query GetAuthors($limit: Int, $pageNumber: Int, $searchQuery: String) {
    getAuthors(
      limit: $limit
      pageNumber: $pageNumber
      searchQuery: $searchQuery
    ) {
      authorId
      name
      biography
      bornDate
      image
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $pageNumber: Int, $searchQuery: String) {
    getBooks(
      limit: $limit
      pageNumber: $pageNumber
      searchQuery: $searchQuery
    ) {
      bookId
      title
      description
      publishedDate
      coverImage
      Author {
        authorId
        name
        image
      }
    }
  }
`;
