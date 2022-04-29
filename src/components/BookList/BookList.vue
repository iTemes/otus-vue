<script setup>
import { computed } from "vue";

import BookItem from "../BookItem/BookItem.vue";

const props = defineProps({
  booksList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["onAddToLibary", "onRemoveFromLibary"]);

const isBooksListLength = computed(() => props.booksList.length > 0);
</script>

<template>
  <section>
    <h2 class="text-3xl mb-6 font-bold">Book list</h2>

    <p v-if="!isBooksListLength">No results from server</p>
    <ul v-else class="books-list">
      <li v-for="book in props.booksList" :key="book.id">
        <BookItem
          :book="book"
          :in-libary="book.inLibary"
          @on-add-book="$emit('onAddToLibary', book)"
          @on-remove-book="$emit('onRemoveFromLibary', book)"
        />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.books-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 20px;

  list-style: none;
}
</style>
