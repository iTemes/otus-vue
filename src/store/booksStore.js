import { defineStore } from "pinia";

import getBooksFromParams from "../api";

export const useBookStore = defineStore("books", {
  state: () => ({ books: [], userBooks: [] }),
  getters: {
    getBookById: (state) => {
      return (id) => state.books.find((book) => book.id === id);
    },
    getBooks() {
      return this.books;
    },
    getUserBooks() {
      return this.userBooks;
    },
  },
  actions: {
    addBooks(data) {
      this.books = [];
      this.books = [...data];
    },
    addBookToLibary(book) {
      const bookForLibary = this.getBookById(book.id);

      if (bookForLibary) {
        bookForLibary.inLibary = true;
        this.userBooks.push(bookForLibary);
      } else this.userBooks.push(book);
    },
    removeBookFromLibary(book) {
      const bookForLibary = this.getBookById(book.id);

      if (bookForLibary) {
        bookForLibary.inLibary = false;
      }

      this.userBooks = this.userBooks.filter((item) => item.id !== book.id);
    },
    async fetchBooks(queryParams) {
      try {
        const response = await getBooksFromParams(queryParams);
        const data = await response.json();

        this.addBooks(data.items);
      } catch (error) {
        // TODO ERROR HANDLER
        throw new Error(error);
      }
    },
  },
});
