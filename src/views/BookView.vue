<script setup>
import { onMounted, computed } from "vue";

import { useRouter } from "vue-router";

import { useBookStore } from "@/store/booksStore";

import PageTemplate from "./general/PageTemplate/PageTemplate.vue";

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    default: () => "",
  },
});

const store = useBookStore();

const bookAuthors = computed(() => store.singleBook?.volumeInfo.authors || []);
const bookISBNs = computed(
  () => store.singleBook?.volumeInfo.industryIdentifiers
);
const bookRetailPrice = computed(
  () =>
    `${store.singleBook?.saleInfo.retailPrice.amount} ${store.singleBook?.saleInfo.retailPrice.currencyCode}`
);
const bookCategories = computed(
  () => store.singleBook?.volumeInfo.categories || []
);
const isBookAvailable = computed(
  () => !store.isError && !store.isLoading && store.singleBook
);

const handleCloseBook = () => {
  router.back();
};
const fetchData = () => {
  store.fetchSingleBook(props.id);
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <PageTemplate>
    <template #main>
      <section v-if="isBookAvailable" class="md:w-2/4 mx-auto mt-10">
        <div class="relative max-w-sm w-full lg:max-w-full lg:flex items-start">
          <button
            class="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            @click="handleCloseBook"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 3.44l5.5 5.5 4.97-4.97a.75.75 0 1 1 1.06 1.06L11.06 10l4.97 4.97a.75.75 0 1 1-1.06 1.06L10 11.06l-5.5 5.5-1.06-1.06 5.5-5.5-5.5-5.5L4.5 3.44z"
                fill="#151528"
              />
            </svg>
            <span>Close</span>
          </button>
          <img
            v-if="store.singleBook.volumeInfo.imageLinks"
            class="h-48 lg:h-auto lg:w-1/4 rounded-t lg:rounded-t-none lg:rounded-l"
            :src="store.singleBook.volumeInfo.imageLinks.thumbnail"
            :alt="store.singleBook.volumeInfo.title"
          />
          <div
            class="lg:w-3/4 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
          >
            <div class="mb-8">
              <div
                v-if="bookISBNs"
                class="text-sm text-gray-600 flex items-center mb-5"
              >
                <p v-for="isbn in bookISBNs" :key="isbn.identifier">
                  <span
                    class="bg-gray-200 rounded-full font-semibold text-gray-700 px-3 py-1 mr-2 mb-2"
                  >
                    № {{ isbn.identifier }}
                  </span>
                </p>
              </div>
              <h2 class="text-gray-900 font-bold text-xl text-left mb-2">
                {{ store.singleBook.volumeInfo.title }}
              </h2>
              <p class="text-gray-700 text-base text-left">
                {{ store.singleBook.volumeInfo.description }}
              </p>
            </div>
            <div v-if="bookCategories.length" class="flex pt-2 pb-2">
              <span
                v-for="(tag, key) in bookCategories"
                :key="key"
                class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{{ tag }}
              </span>
            </div>
            <div class="flex items-center">
              <div v-if="bookAuthors.length" class="text-sm text-left">
                <p
                  v-for="(author, key) in bookAuthors"
                  :key="key"
                  class="text-gray-900 leading-none"
                >
                  {{ author }}
                </p>
                <p class="text-gray-600">
                  {{ store.singleBook.volumeInfo.publishedDate }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-end my-10">
              <p v-if="store.singleBook.saleInfo.retailPrice">
                <b>{{ bookRetailPrice }}</b>
              </p>
              <a
                v-if="store.singleBook.saleInfo.buyLink"
                :href="store.singleBook.saleInfo.buyLink"
                target="_blank"
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-4 rounded"
              >
                Buy
              </a>
            </div>
          </div>
        </div>
      </section>
      <p v-if="store.isError" class="my-20">
        Sorry..., We Can`t find your book
        <button
          class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-4 rounded"
          @click="handleCloseBook"
        >
          Go back
        </button>
      </p>
      <p v-if="store.isLoading">Loading...</p>
    </template>
  </PageTemplate>
</template>
