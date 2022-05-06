import { defineStore } from "pinia";

import getBooksFromParams, { getSingleBook } from "../api";

export const useBookStore = defineStore("books", {
  state: () => ({
    books: [],
    userBooks: [],
    isLoading: false,
    isError: false,
    singleBook: null,
  }),
  getters: {
    getBookById: (state) => {
      return (id) => state.books.find((book) => book.id === id);
    },
    getBookByIdInLibary: (state) => {
      return (id) => state.userBooks.find((book) => book.id === id);
    },
    getBooks() {
      return this.books;
    },
    getUserBooks() {
      return this.userBooks;
    },
    getUserBooksCount() {
      return this.userBooks.length;
    },
  },
  actions: {
    addBooks(data) {
      this.books = [];

      const preparedBooks = data.map((book) => {
        if (this.getBookByIdInLibary(book.id)) {
          book.inLibary = true;
        }
        return book;
      });

      this.books = preparedBooks;
    },
    addBooksToLibary(data) {
      this.userBooks = [];
      this.userBooks = [...data];
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
      console.log("removeBookFromLibary", this.userBooks);
    },
    async fetchBooks(queryParams) {
      try {
        this.isError = false;
        this.isLoading = true;

        const response = await getBooksFromParams(queryParams);
        const data = await response.json();

        this.addBooks(data.items);
      } catch (error) {
        // TODO ERROR HANDLER Tooltip
        this.isError = true;
        throw new Error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchSingleBook(id) {
      try {
        this.isError = false;
        this.isLoading = true;
        this.singleBook = null;

        const response = await getSingleBook(id);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        this.singleBook = data;
      } catch (error) {
        // TODO ERROR HANDLER Tooltip
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
