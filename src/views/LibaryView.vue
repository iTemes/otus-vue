<script setup>
import { useBookStore } from "@/store/booksStore";

import PageTemplate from "./general/PageTemplate/PageTemplate.vue";
import BookList from "@/components/BookList/BookList.vue";
import AddBookForm from "@/components/AddBookForm/AddBookForm.vue";

const store = useBookStore();

const emit = defineEmits(["onReadMore", "onAddBook", "onRemoveBook"]);

const handleAddNewBook = (book) => store.addBookToLibary(book);
const handleRemoveBook = (book) => store.removeBookFromLibary(book);
</script>

<template>
  <PageTemplate>
    <template #main>
      <section class="mt-10">
        <h2 class="text-3xl mb-9">My Libary</h2>
        <AddBookForm @on-add-new-book="handleAddNewBook" />
        <BookList
          v-if="store.userBooks.length"
          :books-list="store.userBooks"
          @on-remove-from-libary="handleRemoveBook"
        />
        <p v-else>No books in libary :(</p>
      </section>
    </template>
  </PageTemplate>
</template>
