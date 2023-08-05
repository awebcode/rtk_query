// src/components/BookList.js
import React, { useContext, useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "../api/books";
import BookDetails from "./BookDetails";
import { MessageContext } from "../context";

const BookList = ({ onEdit }) => {
    const {message,setMessage} = useContext(MessageContext)
   
  const { data: books = [], isFetching } = useGetBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const [viewBookId, setViewBookId] = useState(null);
//   const [message,setMessage]=useState(null)
  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
        await deleteBook(bookId);
        setMessage("Book deleted successfully.")
    }
  };

  const handleView = (bookId) => {
    setViewBookId(bookId);
  };

  const handleViewClose = () => {
    setViewBookId(null);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
          <h2>Book List</h2>
          {message && <p className="message">{message} <button onClick={()=>setMessage("")} >close</button></p>}
      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => handleDelete(book._id)} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button onClick={() => handleView(book._id)}>View</button>
        </div>
      ))}
      {viewBookId && <BookDetails bookId={viewBookId} onClose={handleViewClose} />}
    </div>
  );
};

export default BookList;
