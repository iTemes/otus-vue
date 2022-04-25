<script setup>
import { computed } from "vue";

import BookItem from "../BookItem/BookItem.vue";

const props = defineProps({
  booksList: {
    type: Array,
    default: () => [],
  },
});

const isBooksListLength = computed(() => props.booksList.length > 0);
</script>

<template>
  <section>
    <h2>Book list</h2>

    <p v-if="!isBooksListLength">No results from server</p>
    <ul v-else class="books-list">
      <li v-for="book in props.booksList" :key="book.id">
        <BookItem :book="book.volumeInfo" />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 20px;

  list-style: none;
}
</style>
