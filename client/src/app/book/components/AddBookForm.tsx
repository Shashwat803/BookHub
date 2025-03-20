"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { BookOpen, FileText, ImageIcon } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOOK } from "@/graphql/mutation";
import { Get_AuthorNameList, GET_BOOKS } from "@/graphql/queries";
import { Book } from "@/types";

function BookForm({
  visible,
  onClose,
  book,
}: {
  visible: boolean;
  onClose: () => void;
  book?: Book;
}) {
  const initialFormData = {
    bookId: book?.bookId || undefined,
    title: book?.title || "",
    description: book?.description || "",
    publishedDate: book?.publishedDate
      ? new Date(book.publishedDate)
      : undefined,
    authorId: book?.Author?.authorId,
    coverImage: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    publishedDate: false,
    authorId: false,
  });

  const [createBook, { loading }] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      {
        query: GET_BOOKS,
        variables: { limit: 3, pageNumber: 1, searchQuery: "" },
      },
    ],
    awaitRefetchQueries: true,
  });

  const { data } = useQuery(Get_AuthorNameList);
  const authors = data?.getAuthorNameList;

  const handleSubmit = async () => {
    const newErrors = {
      title: !formData.title,
      description: !formData.description,
      publishedDate: !formData.publishedDate,
      authorId: !formData.authorId,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const variables = {
        bookId: formData.bookId || undefined,
        title: formData.title,
        description: formData.description,
        publishedDate: formData.publishedDate
          ? format(formData.publishedDate, "yyyy-MM-dd")
          : "",
        authorId: Number(formData.authorId),
        coverImage: formData.coverImage,
      };

      console.log("Submitting with variables:", variables);

      const response = await createBook({
        variables: variables,
      });

      console.log("Book created successfully!", response);
      setFormData(initialFormData); // Reset form data
      onClose();
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleChange = (field: string, value: string | number | Date) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, coverImage: file });
    setErrors({ ...errors });
  };

  const handleClose = () => {
    setFormData(initialFormData); // Reset form data
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-8 border border-gray-800 min-h-[80vh]">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {book ? "Edit Book" : "Add New Book"}
        </h2>

        {/* Title Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <div className="relative">
            <Input
              placeholder="Enter book title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                errors.title && "border-red-500"
              )}
            />
            <BookOpen className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">Title is required</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <div className="relative">
            <Textarea
              placeholder="Enter book description"
              rows={6}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500",
                errors.description && "border-red-500"
              )}
            />
            <FileText className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">Description is required</p>
          )}
        </div>

        {/* Published Date Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Published Date
          </label>
          <div className="relative">
            <input
              type="date"
              className={cn(
                "w-full bg-gray-800 text-white border border-gray-700 rounded p-3 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 outline-none",
                errors.publishedDate && "border-red-500"
              )}
              value={
                formData.publishedDate
                  ? format(formData.publishedDate, "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                handleChange("publishedDate", new Date(e.target.value))
              }
            />
          </div>
          {errors.publishedDate && (
            <p className="mt-1 text-sm text-red-500">
              Published date is required
            </p>
          )}
        </div>

        {/* Author Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Author
          </label>
          <div className="relative ">
            <Select
              value={formData.authorId ? String(formData.authorId) : ""}
              onValueChange={(value) => handleChange("authorId", value)}
            >
              <SelectTrigger
                className={cn(
                  "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                  errors.authorId && "border-red-500"
                )}
              >
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {authors.map((author: { authorId: number; name: string }) => (
                  <SelectItem
                    key={author.authorId}
                    value={String(author.authorId)}
                    className="hover:bg-gray-700 focus:bg-gray-700"
                  >
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.authorId && (
            <p className="mt-1 text-sm text-red-500">Author is required</p>
          )}
        </div>

        {/* Cover Image Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Cover Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="cover-image-upload"
            />
            <label
              htmlFor="cover-image-upload"
              className={cn(
                "w-full flex items-center justify-between bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-3 h-12 cursor-pointer"
              )}
            >
              <span>
                {formData.coverImage
                  ? formData.coverImage.name
                  : "Upload a cover image"}
              </span>
              <ImageIcon className="h-5 w-5 text-gray-400" />
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 h-12 px-6"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className="hover:bg-blue-700 text-white h-12 px-6"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookForm;