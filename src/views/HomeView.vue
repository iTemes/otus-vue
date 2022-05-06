<script setup>
import { useBookStore } from "@/store/booksStore";

import PageTemplate from "@/views/general/PageTemplate/PageTemplate.vue";
import BookList from "@/components/BookList/BookList.vue";
import SearchForm from "@/components/SearchForm/SearchForm.vue";

const emit = defineEmits(["onSearch", "onAddBook", "onRemoveBook"]);

const store = useBookStore();

const handleFormSubmit = (params) => store.fetchBooks(params);
const handleAddToLibary = (book) => store.addBookToLibary(book);
const handleRemoveFromLibary = (book) => store.removeBookFromLibary(book);
</script>

<template>
  <PageTemplate>
    <template #main>
      <SearchForm @on-form-submit="handleFormSubmit" />
      <BookList
        v-if="store.books.length"
        :books-list="store.books"
        @on-add-to-libary="handleAddToLibary"
        @on-remove-from-libary="handleRemoveFromLibary"
      />
    </template>
  </PageTemplate>
</template>
