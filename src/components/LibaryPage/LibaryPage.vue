<script setup>
import BookList from "../BookList/BookList.vue";
import AddBookForm from "../AddBookForm/AddBookForm.vue";

const props = defineProps({
  usersBooks: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["onReadMore", "onAddNewBook", "onRemoveFromLibary"]);

const handleReadMore = (book) => {
  emit("onReadMore", book);
};

const handleAddNewBook = (book) => {
  emit("onAddNewBook", book);
};
const handleRemoveBook = (book) => {
  emit("onRemoveFromLibary", book);
};
</script>

<template>
  <section class="mt-10">
    <h2 class="text-3xl mb-9">My Libary</h2>
    <AddBookForm @on-add-new-book="handleAddNewBook" />
    <BookList
      v-if="props.usersBooks.length"
      :books-list="props.usersBooks"
      @on-read-more="handleReadMore"
      @on-remove-from-libary="handleRemoveBook"
    />
  </section>
</template>

<style></style>
