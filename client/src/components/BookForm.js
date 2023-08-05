// src/components/BookForm.js
import React, { useContext, useState } from "react";
import { useCreateBookMutation, useUpdateBookMutation } from "../api/books";
import { MessageContext } from "../context";

const BookForm = ({ book, onClose }) => {
  const initialState = book
    ? { title: book.title, author: book.author, genre: book.genre }
    : { title: "", author: "", genre: "" };
  const [formData, setFormData] = useState(initialState);
  const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
 const { message, setMessage } = useContext(MessageContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (book) {
        await updateBook({ id: book._id, ...formData });
        setMessage("Data Updated successfully")
    } else {
        await createBook(formData);
         setMessage("Data Created  successfully");
    }

    onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h2>{book ? "Edit Book" : "Add Book"}</h2>
        {message && (
          <p className="message">
            {message} <button onClick={() => setMessage("")}>close</button>
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={isCreating || isUpdating}>
            {isCreating ? "Creating..." : isUpdating ? "Updating..." : "Save"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
