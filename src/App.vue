<script setup>
import { reactive } from "vue";

import BookList from "./components/BookList/BookList.vue";
import BookPage from "./components/BookPage/BookPage.vue";
import SearchForm from "./components/SearchForm/SearchForm.vue";

const state = reactive({ books: [], currentBook: null });

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
</script>

<template>
  <main class="container mx-auto">
    <BookPage
      v-if="state.currentBook"
      :volume-info="state.currentBook.volumeInfo"
      :sale-info="state.currentBook.saleInfo"
      @on-close-book="handleCloseBook"
    />
    <div v-show="!state.currentBook">
      <SearchForm @on-form-submit="handleFormSubmit" />
      <BookList
        v-if="state.books.length"
        :books-list="state.books"
        @on-read-more="handleReadMore"
      />
    </div>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
