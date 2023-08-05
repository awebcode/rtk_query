// src/api/books.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApiii",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["Book"],
      // Add a transformResponse to sort the books by createdAt in descending order
      transformResponse: (response) => {
        return response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      },
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
      // Add the onSuccess callback to update the cache with the new book
      onSuccess: (response, variables, api, queryName) => {
        console.log("create", api.endpoints.getBooks.query());
        api.endpoints.getBooks.query();
      },
    }),
    updateBook: builder.mutation({
      query: ({ id, ...book }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Book"],
      // Add onSuccess to refetch the getBooks query after updating a book
      onSuccess: (response, variables, api, queryName) => {
        api.endpoints.getBooks.query();
      },
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
      // Add onSuccess to refetch the getBooks query after deleting a book
      onSuccess: (response, variables, api, queryName) => {
        api.endpoints.getBooks.query();
      },
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
