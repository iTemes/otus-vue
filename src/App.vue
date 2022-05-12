<script setup>
import { watch, onMounted } from "vue";

import { useBookStore } from "@/store/booksStore";

import PageHeader from "./views/general/PageHeader/PageHeader.vue";

const store = useBookStore();

watch(
  store.$state,
  (state) => {
    const userBooks = state.userBooks;
    localStorage.setItem("userBooks", JSON.stringify(userBooks));
  },
  { deep: true }
);

onMounted(() => {
  const userBooksFromStorage = JSON.parse(localStorage.getItem("userBooks"));
  userBooksFromStorage && store.addBooksToLibary(userBooksFromStorage);
});
</script>

<template>
  <PageHeader />
  <router-view />
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
