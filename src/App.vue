<script setup>
import { reactive } from "vue";

import BookList from "./components/BookList/BookList.vue";
import BookPage from "./components/BookPage/BookPage.vue";
import LibaryPage from "./components/LibaryPage/LibaryPage.vue";
import SearchForm from "./components/SearchForm/SearchForm.vue";
import PageHeader from "./components/PageHeader/PageHeader.vue";

const state = reactive({
  books: [],
  currentBook: null,
  openLibary: false,
  usersBooks: [],
});

const handleFormSubmit = (data) => {
  state.books = [];
  state.books = [...data];
};

const handleReadMore = (book) => {
  state.currentBook = book;
};
const handleCloseBook = () => {
  state.currentBook = null;
};

const handleAddToLibary = (book) => {
  book.inLibary = true;
  state.usersBooks.push(book);
};

const handleRemoveFromLibary = (book) => {
  book.inLibary = false;
  state.usersBooks = state.usersBooks.filter((item) => item.id !== book.id);
};

const handleLibaryVIsability = (visible) => {
  state.openLibary = visible;
};
</script>

<template>
  <main class="container mx-auto">
    <PageHeader @on-show-libary="handleLibaryVIsability" />
    <!-- Пока не используем роуты -->
    <template v-if="!state.openLibary">
      <div v-show="!state.currentBook">
        <SearchForm @on-form-submit="handleFormSubmit" />
        <BookList
          v-if="state.books.length"
          :books-list="state.books"
          :users-books="state.usersBooks"
          @on-read-more="handleReadMore"
          @on-add-to-libary="handleAddToLibary"
          @on-remove-from-libary="handleRemoveFromLibary"
        />
      </div>
    </template>
    <LibaryPage
      v-else
      v-show="!state.currentBook"
      :users-books="state.usersBooks"
      @on-read-more="handleReadMore"
      @on-add-new-book="handleAddToLibary"
      @on-remove-from-libary="handleRemoveFromLibary"
    />
    <BookPage
      v-if="state.currentBook"
      :volume-info="state.currentBook.volumeInfo"
      :sale-info="state.currentBook.saleInfo"
      @on-close-book="handleCloseBook"
    />
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
