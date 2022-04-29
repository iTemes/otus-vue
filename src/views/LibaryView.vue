<script setup>
import PageTemplate from "./general/PageTemplate/PageTemplate.vue";
import BookList from "@/components/BookList/BookList.vue";
import AddBookForm from "@/components/AddBookForm/AddBookForm.vue";

const props = defineProps({
  usersBooks: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["onReadMore", "onAddBook", "onRemoveBook"]);

const handleAddNewBook = (book) => emit("onAddBook", book);
const handleRemoveBook = (book) => emit("onRemoveBook", book);
</script>
<template>
  <PageTemplate>
    <template #main>
      <section class="mt-10">
        <h2 class="text-3xl mb-9">My Libary</h2>
        <AddBookForm @on-add-new-book="handleAddNewBook" />
        <BookList
          v-if="props.usersBooks.length"
          :books-list="props.usersBooks"
          @on-remove-from-libary="handleRemoveBook"
        />
      </section>
    </template>
  </PageTemplate>
</template>
