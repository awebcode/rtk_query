import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { booksApi } from "./api/books";
import "./index.css";
import App from "./App";
import { MessageProvider } from "./context";

const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

setupListeners(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <MessageProvider>
      <App />
    </MessageProvider>
  </Provider>,

  document.getElementById("root")
);
