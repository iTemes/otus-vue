<script setup>
import { reactive, onBeforeMount, onMounted } from "vue";

import BookList from "./components/BookList/BookList.vue";
import SearchForm from "./components/SearchForm/SearchForm.vue";

const state = reactive({ books: [] });

const handleFormSubmit = (data) => {
  console.log("$emit", data);
  state.books = [...data];
};

onBeforeMount(() => {
  console.log("onBeforeMount");
});

onMounted(() => {
  console.log("onMounted");
});
</script>

<template>
  <main>
    <SearchForm @on-form-submit="handleFormSubmit" />
    <BookList v-if="state.books.length" :books-list="state.books" />
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
