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
      authors {
        authorId
        name
        biography
        bornDate
        image
        books {
          bookId
          title
          description
          publishedDate
          coverImage
        }
      }
      totalAuthors
      totalPages
      currentPage
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
      books {
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
      totalBooks
      totalPages
      currentPage
    }
  }
`;