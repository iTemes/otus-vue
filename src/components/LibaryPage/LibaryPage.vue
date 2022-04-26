<script setup>
import BookList from "../BookList/BookList.vue";

const props = defineProps({
  usersBooks: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["onReadMore"]);
</script>

<template>
  <section class="mt-10">
    <h2>My Libary</h2>
    <BookList
      v-if="props.usersBooks.length"
      :books-list="props.usersBooks"
      @on-read-more="$emit('onReadMore')"
    />
  </section>
</template>

<style></style>
