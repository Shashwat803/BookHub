"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "@/types";
import { Calendar, Eye, X, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageBaseUrl } from "@/utils/URL";

const BookCard = ({
  book,
  onEdit,
  onDelete,
}: {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}) => {
  const [showPreview, setShowPreview] = useState(false);

  console.log(book)

  return (
    <>
      {/* Book Card - More compact version */}
      <Card className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 text-white shadow-lg transition-all hover:shadow-indigo-900/20">
        <div className="flex">
          {/* Book Cover on the left */}
          {book.coverImage && (
            <div className="relative h-48 w-1/3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10"></div>
              <Image
                src={`${ImageBaseUrl}/${book.coverImage}`}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-300"
              />
            </div>
          )}

          {/* Book Details on the right */}
          <div className="w-2/3 p-3">
            <CardHeader className="p-0">
              <CardTitle className="line-clamp-1 font-bold text-base">{book.title}</CardTitle>
              
              {/* Author Info - more compact */}
              <div className="mt-1 flex items-center gap-2">
                {book.Author.image ? (
                  <Image
                    src={`${ImageBaseUrl}/${book.Author.image}`}
                    alt={book.Author.name}
                    width={24}
                    height={24}
                    className="rounded-full border border-gray-700 object-cover"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold">
                    {book.Author.name.charAt(0)}
                  </div>
                )}
                <p className="text-xs font-medium text-gray-300">{book?.Author?.name}</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 p-0 pt-2">
              {/* Published Date - more compact */}
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                <p>{book.publishedDate}</p>
              </div>

              {/* Action Buttons - more compact */}
              <div className="grid grid-cols-3 gap-1 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex h-8 items-center justify-center gap-1 border-gray-700 bg-gray-800/50 text-xs text-gray-300 backdrop-blur-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-500"
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="h-3 w-3" /> Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex h-8 items-center justify-center gap-1 border-gray-700 bg-gray-800/50 text-xs text-gray-300 backdrop-blur-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-500"
                  onClick={() => onEdit(book)}
                >
                  <Edit className="h-3 w-3" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex h-8 items-center justify-center gap-1 border-gray-700 bg-gray-800/50 text-xs text-gray-300 backdrop-blur-sm hover:bg-rose-600 hover:text-white hover:border-rose-500"
                  onClick={() => onDelete(book.bookId || 0)}
                >
                  <Trash className="h-3 w-3" /> Delete
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Book Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-xl border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/80 p-3 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">{book.title}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <div className="flex flex-col gap-4 md:flex-row">
                {/* Book Cover in Modal */}
                {book.coverImage && (
                  <div className="w-full md:w-1/3">
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={`${ImageBaseUrl}/${book.coverImage}`}
                        alt={book.title}
                        width={200}
                        height={300}
                        className="w-full object-cover"
                      />
                    </div>
                    
                    {/* Book metadata in modal */}
                    <div className="mt-3 space-y-2 rounded-lg bg-gray-800/50 p-3">
                      <div className="flex items-center gap-2">
                        {book.Author.image ? (
                          <Image
                            src={`${ImageBaseUrl}/${book.Author.image}`}
                            alt={book.Author.name}
                            width={32}
                            height={32}
                            className="rounded-full border border-gray-700 object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold">
                            {book.Author.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-medium text-gray-300">Author</p>
                          <p className="text-sm text-white">{book?.Author?.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-indigo-400" />
                        <div>
                          <p className="text-xs font-medium text-gray-300">Published</p>
                          <p className="text-sm text-white">{book.publishedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Book Description in Modal */}
                <div className="w-full md:w-2/3">
                  <h4 className="mb-2 text-base font-semibold text-white">
                    About this book
                  </h4>
                  <p className="mb-4 text-sm leading-relaxed text-gray-300">{book.description}</p>
                  
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex gap-1 border-indigo-500 bg-indigo-600/20 text-white hover:bg-indigo-600"
                      onClick={() => onEdit(book)}
                    >
                      <Edit className="h-3.5 w-3.5" /> Edit Book
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex gap-1 border-rose-500 bg-rose-600/20 text-white hover:bg-rose-600"
                      onClick={() => {
                        onDelete(book.bookId || 0);
                        setShowPreview(false);
                      }}
                    >
                      <Trash className="h-3.5 w-3.5" /> Delete Book
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;