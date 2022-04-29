<template>
  <PageHeader />
  <router-view
    :books="state.books"
    :users-books="state.usersBooks"
    @on-search="handleFormSubmit"
    @on-add-book="handleAddToLibary"
    @on-remove-book="handleRemoveFromLibary"
  />
</template>

<script setup>
import { reactive } from "vue";

import PageHeader from "./views/general/PageHeader/PageHeader.vue";

const state = reactive({
  books: [],
  usersBooks: [],
});

const handleFormSubmit = (data) => {
  state.books = [];
  state.books = [...data];
};

const handleAddToLibary = (book) => {
  book.inLibary = true;
  state.usersBooks.push(book);
};

const handleRemoveFromLibary = (book) => {
  book.inLibary = false;
  state.usersBooks = state.usersBooks.filter((item) => item.id !== book.id);
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
