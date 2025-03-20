import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";

function AddBookButton({ openModal }: { openModal: () => void }) {
  return (
    <Button
      className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 cursor-pointer"
      onClick={openModal}
    >
      <PlusCircle size={16} />
      Add Book
    </Button>
  );
}

export default AddBookButton;
