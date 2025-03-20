"use client";
import React, { useState } from "react";
import { Author } from "@/types";
import AuthorCard from "./AuthorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Loader,
} from "lucide-react";
import AddAuthorButton from "./AddAuthorButton";
import { useMutation, useQuery } from "@apollo/client";
import { Get_Authors } from "@/graphql/queries";
import { useDebounce } from "@/hooks/useDebounce";
import AuthorForm from "./AddAuthorForm";
import { DELETE_AUTHOR } from "@/graphql/mutation";

interface AuthorListProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthorList: React.FC<AuthorListProps> = ({ setVisible, visible }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 1000);
  const [editAuthor, setEditAuthor] = useState<Author | null>(null);

  const { data, loading, refetch } = useQuery(Get_Authors, {
    variables: {
      limit: authorsPerPage,
      pageNumber: currentPage,
      searchQuery: debouncedValue,
    },
  });

  const authors = data?.getAuthors || [];
  const totalPages = Math.ceil(authors.length / authorsPerPage);

  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [
      {
        query: Get_Authors,
        variables: {
          limit: authorsPerPage,
          pageNumber: currentPage,
          searchQuery: debouncedValue,
        },
      },
    ],
  });

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (author: Author) => {
    setEditAuthor(author);
    setVisible(true);
  };

  const handleDelete = async (authorId: number) => {
    try {
      await deleteAuthor({ variables: { authorId } });
      refetch();
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl">
      {/* Search Section */}
      <div className="mb-6 bg-gray-900 p-4 rounded-lg border border-gray-800">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow relative">
            <Input
              type="text"
              placeholder="Search authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <AddAuthorButton openModal={() => setVisible(true)} />
        </div>
      </div>

      {/* Authors Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin h-8 w-8 text-gray-400" />
        </div>
      ) : authors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {authors.map((author: Author, index: number) => (
            <AuthorCard
              key={index}
              author={author}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
          <p className="text-gray-400">No authors found.</p>
        </div>
      )}

      {/* Pagination */}
      {authors.length > 0 && (
        <div className="flex justify-between items-center mt-8 border-t border-gray-800 pt-4">
          <div className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 flex items-center"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
              <span className="ml-1">Previous</span>
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 flex items-center"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <span className="mr-1">Next</span>
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      )}

      {editAuthor && (
        <AuthorForm
          visible={visible}
          onClose={() => {
            setEditAuthor(null);
            setVisible(false);
          }}
          author={editAuthor}
        />
      )}
    </div>
  );
};

export default AuthorList;
