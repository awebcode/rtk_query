// src/App.js
import React, { useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleEdit = (book) => {
    setIsEditing(book);
  };

  const handleFormClose = () => {
    setIsAdding(false);
    setIsEditing(null);
  };

  return (
    <div>
      <h1>Book Management CRUD App</h1>
      <button onClick={handleAdd}>Add Book</button>
      <BookList onEdit={handleEdit} />
      {isAdding || isEditing ? (
        <BookForm book={isEditing} onClose={handleFormClose} />
      ) : null}
    </div>
  );
}

export default App;
