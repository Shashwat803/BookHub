"use client";
import React, { useState } from "react";
import AuthorList from "./components/AuthorList";
import AuthorForm from "./components/AddAuthorForm";

function Author() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Authors</h1>
      <AuthorForm visible={visible} onClose={() => setVisible(false)} />
      <AuthorList visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default Author;
