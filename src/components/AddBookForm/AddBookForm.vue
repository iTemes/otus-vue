<script setup>
import { reactive, ref, onMounted } from "vue";

import uniqid from "uniqid";

const emit = defineEmits(["onAddNewBook"]);

const input = ref(null);
const form = ref(null);

const state = reactive({
  newBook: {
    id: "",
    inLibary: true,
    volumeInfo: {
      title: "",
      subtitle: "",
      description: "",
    },
    saleInfo: {
      retailPrice: {
        amount: 0,
        currencyCode: "",
      },
      buyLink: "#",
    },
  },
});

const handleFormSubmit = () => {
  state.newBook.id = uniqid();
  emit("onAddNewBook", state.newBook);
  form.value.reset();
};

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <form
    ref="form"
    class="w-full max-w-lg mx-auto my-20"
    @submit.prevent="handleFormSubmit"
  >
    <h2 class="text-xl mb-5">Add book to Libary</h2>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="book-title"
        >
          Book title
        </label>
        <input
          id="book-title"
          ref="input"
          v-model="state.newBook.volumeInfo.title"
          required
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="You dont know JS"
        />
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="sub-title"
        >
          Sub title
        </label>
        <input
          id="sub-title"
          v-model="state.newBook.volumeInfo.subtitle"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="ES6"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="book-descript"
        >
          Description
        </label>
        <input
          id="book-descript"
          v-model="state.newBook.volumeInfo.description"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="Description"
        />
        <p class="text-gray-600 text-xs italic">
          Make it as long and as crazy as you'd like
        </p>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-image"
        >
          Image link
        </label>
        <input
          id="grid-image"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="https://"
        />
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-state"
        >
          Catgory
        </label>
        <div class="relative">
          <select
            id="grid-state"
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option disabled selected />
            <option>Computers</option>
            <option>Business & Economics</option>
            <option>Crafts & Hobbies</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          />
        </div>
      </div>
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-ISBN"
        >
          ISBN
        </label>
        <input
          id="grid-ISBN"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          type="text"
          placeholder="9785446112661"
        />
      </div>
    </div>
    <button
      class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-4 rounded mt-10"
    >
      Add Book
    </button>
  </form>
</template>

<style></style>
