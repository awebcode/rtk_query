// src/components/BookDetails.js
import React from "react";
import { useGetBookByIdQuery } from "../api/books";

const BookDetails = ({ bookId, onClose }) => {
  const { data: book, isFetching } = useGetBookByIdQuery(bookId);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal-container">
      <div className="modal">
      <h2>Book Details</h2>
      {book ? (
        <div>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <button onClick={onClose}>Close</button>
        </div>
      ) : (
        <div>Book not found</div>
              )}
              <h1 className="close" onClick={onClose}>X</h1>
              </div>
    </div>
  );
};

export default BookDetails;
