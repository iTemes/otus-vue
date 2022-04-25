<script setup>
import { reactive, onBeforeMount, onMounted } from "vue";
import getBooksFromParams from "./api";

import BookList from "./components/BookList/BookList.vue";

const state = reactive({ books: [] });

onBeforeMount(() => {
  console.log("onBeforeMount");
  getBooksFromParams()
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      if (data.error) throw new Error(data.error);
      state.books = [...data.items];
    })
    .catch((error) => {
      console.log("Error", error.message);
    });
});

onMounted(() => {
  console.log("onMounted");
});
</script>

<template>
  <div>
    <BookList :books-list="state.books" />
  </div>
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
