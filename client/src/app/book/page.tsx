"use client";
import React, { useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/AddBookForm";

function Books() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Book Collection</h1>
      <BookForm visible={visible} onClose={() => setVisible(false)} />
      <BookList visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default Books;
