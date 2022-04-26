<script setup>
import BookList from "../BookList/BookList.vue";

const props = defineProps({
  usersBooks: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["onReadMore"]);

const handleReadMore = (book) => {
  console.log("#Readmore in Libary Page", book);
  emit("onReadMore", book);
};
</script>

<template>
  <section class="mt-10">
    <h2>My Libary</h2>
    <BookList
      v-if="props.usersBooks.length"
      :books-list="props.usersBooks"
      @on-read-more="handleReadMore"
    />
  </section>
</template>

<style></style>
