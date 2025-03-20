"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  User,
  FileText,
  ImageIcon,
} from "lucide-react";
import { useMutation } from "@apollo/client";
import { CREATE_AUTHOR } from "@/graphql/mutation";
import { Get_Authors } from "@/graphql/queries";
import { Author } from "@/types";

function AuthorForm({
  visible,
  onClose,
  author,
}: {
  visible: boolean;
  onClose: () => void;
  author?: Author;
}) {
  const [formData, setFormData] = useState({
    authorId: author?.authorId || undefined,
    name: author?.name || "",
    biography: author?.biography || "",
    born_date: author?.bornDate ? new Date(author.bornDate) : undefined,
    image: null as File | null,
  });

  const [addAuthor, { loading }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [
      {
        query: Get_Authors,
        variables: { limit: 10, pageNumber: 1, searchQuery: "" },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [errors, setErrors] = useState({
    name: false,
    biography: false,
    born_date: false,
  });

  const handleSubmit = async () => {
    const newErrors = {
      name: !formData.name,
      biography: !formData.biography,
      born_date: !formData.born_date,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const variables = {
        authorId: formData.authorId || undefined,
        name: formData.name,
        biography: formData.biography,
        bornDate: formData.born_date
          ? format(formData.born_date, "yyyy-MM-dd")
          : "",
        image: formData.image,
      };

      console.log("Submitting with variables:", variables);

      const response = await addAuthor({
        variables: variables,
      });

      console.log("Author created successfully!", response);
      onClose();
    } catch (error) {
      console.error("Error creating author:", error);
    }
  };
  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: false });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
    setErrors({ ...errors });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-8 border border-gray-800 h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Add New Author</h2>

        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <div className="relative">
            <Input
              placeholder="Enter author name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500 h-12",
                errors.name && "border-red-500"
              )}
            />
            <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">Name is required</p>
          )}
        </div>

        {/* Biography Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Biography
          </label>
          <div className="relative">
            <Textarea
              placeholder="Enter author biography"
              rows={6}
              value={formData.biography}
              onChange={(e) => handleChange("biography", e.target.value)}
              className={cn(
                "bg-gray-800 text-white border-gray-700 focus:border-gray-500",
                errors.biography && "border-red-500"
              )}
            />
            <FileText className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          {errors.biography && (
            <p className="mt-1 text-sm text-red-500">Biography is required</p>
          )}
        </div>

        {/* Born Date Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Born Date
          </label>
          <div className="relative">
            <input
              type="date"
              className={cn(
                "w-full bg-gray-800 text-white border border-gray-700 rounded p-3 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 outline-none",
                errors.born_date && "border-red-500"
              )}
              value={
                formData.born_date
                  ? format(formData.born_date, "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                handleChange("born_date", new Date(e.target.value))
              }
            />
          </div>
          {errors.born_date && (
            <p className="mt-1 text-sm text-red-500">Birth date is required</p>
          )}
        </div>

        {/* Image Upload Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Author Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={cn(
                "w-full flex items-center justify-between bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-3 h-12 cursor-pointer"
              )}
            >
              <span>
                {formData.image ? formData.image.name : "Upload an image"}
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
            onClick={onClose}
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

export default AuthorForm;
