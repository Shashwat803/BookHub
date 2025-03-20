"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Author } from "@/types";
import { User, Calendar, Eye, X, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageBaseUrl } from "@/utils/URL";

const AuthorCard = ({
  author,
  onEdit,
  onDelete,
}: {
  author: Author;
  onEdit: (author: Author) => void;
  onDelete: (authorId: number) => void;
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      {/* Author Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-xl border border-gray-700 hover:shadow-xl hover:border-gray-600">
        <div className="flex">
          {/* Author Image on the left */}
          <div className="relative w-1/3 h-40 flex items-center justify-center bg-gray-700">
            {author.image ? (
              <Image
                src={`${ImageBaseUrl}/${author.image}`}
                alt={author.name}
                fill
                className="object-cover p-2 rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <User className="text-gray-400 w-12 h-12" />
            )}
          </div>

          {/* Author Details on the right */}
          <div className="w-2/3 flex flex-col justify-between p-3">
            <CardHeader className="p-0">
              <CardTitle className="text-lg font-bold truncate">
                {author.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 space-y-2">
              {/* Born Date */}
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-400 w-4 h-4" />
                <p className="text-gray-400 text-sm">
                  Born: {new Date(author.bornDate).toLocaleDateString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
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
                  onClick={() => onEdit(author)}
                >
                  <Edit className="h-3 w-3" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex h-8 items-center justify-center gap-1 border-gray-700 bg-gray-800/50 text-xs text-gray-300 backdrop-blur-sm hover:bg-rose-600 hover:text-white hover:border-rose-500"
                  onClick={() => onDelete(author.authorId || 0)}
                >
                  <Trash className="h-3 w-3" /> Delete
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Author Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{author.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full h-8 w-8"
                onClick={() => setShowPreview(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Author Image in Preview Modal */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                  {author.image ? (
                    <div className="relative w-full h-48 md:h-64">
                      <Image
                        src={`${ImageBaseUrl}/${author.image}`}
                        alt={author.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 md:h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                      <User className="text-gray-400 w-24 h-24" />
                    </div>
                  )}
                </div>

                <div className="w-full md:w-2/3">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    About {author.name}
                  </h4>
                  <p className="text-gray-300 mb-4">{author.biography}</p>

                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-1">
                      Born
                    </h5>
                    <p className="text-white">
                      {new Date(author.bornDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Biography
                </h4>
                <div className="bg-gray-800 p-6 rounded-lg text-gray-300">
                  <p className="whitespace-pre-line">{author.biography}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthorCard;
