export interface Book {
  bookId?:number
  title: string;
  description: string;
  publishedDate: string;
  Author: Author;
  coverImage:string
}

export interface Author {
  authorId?:number;
  name: string;
  biography: string;
  bornDate: string;
  image:string
}
