<script setup>
import { computed } from "vue";

const props = defineProps({
  volumeInfo: {
    type: Object,
    default: () => {},
    requared: true,
  },
  saleInfo: {
    type: Object,
    default: () => {},
    requared: true,
  },
});

const emits = defineEmits(["onCloseBook"]);

const getAuthors = computed(() => props.volumeInfo.authors || []);
const getISBNs = computed(() => props.volumeInfo.industryIdentifiers);
const getRetailPrice = computed(
  () =>
    `${props.saleInfo.retailPrice.amount} ${props.saleInfo.retailPrice.currencyCode}`
);
const getCategories = computed(() => props.volumeInfo.categories || []);
</script>

<template>
  <section class="md:w-2/4 mx-auto mt-10">
    <div class="relative max-w-sm w-full lg:max-w-full lg:flex items-start">
      <button
        class="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        @click="$emit('onCloseBook')"
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
        v-if="volumeInfo.imageLinks"
        class="h-48 lg:h-auto lg:w-1/4 rounded-t lg:rounded-t-none lg:rounded-l"
        :src="volumeInfo.imageLinks.thumbnail"
        :alt="volumeInfo.title"
      />
      <div
        class="lg:w-3/4 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
      >
        <div class="mb-8">
          <div
            v-if="getISBNs"
            class="text-sm text-gray-600 flex items-center mb-5"
          >
            <p v-for="isbn in getISBNs" :key="isbn.identifier">
              <span
                class="bg-gray-200 rounded-full font-semibold text-gray-700 px-3 py-1 mr-2 mb-2"
              >
                № {{ isbn.identifier }}
              </span>
            </p>
          </div>
          <h2 class="text-gray-900 font-bold text-xl text-left mb-2">
            {{ volumeInfo.title }}
          </h2>
          <p class="text-gray-700 text-base text-left">
            {{ volumeInfo.description }}
          </p>
        </div>
        <div v-if="getCategories.length" class="flex pt-2 pb-2">
          <span
            v-for="(tag, key) in getCategories"
            :key="key"
            class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{{ tag }}
          </span>
        </div>
        <div class="flex items-center">
          <div v-if="getAuthors.length" class="text-sm text-left">
            <p
              v-for="(author, key) in getAuthors"
              :key="key"
              class="text-gray-900 leading-none"
            >
              {{ author }}
            </p>
            <p class="text-gray-600">{{ volumeInfo.publishedDate }}</p>
          </div>
        </div>

        <div class="flex items-center justify-end my-10">
          <p v-if="saleInfo.retailPrice">
            <b>{{ getRetailPrice }}</b>
          </p>
          <a
            v-if="saleInfo.buyLink"
            :href="saleInfo.buyLink"
            target="_blank"
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-4 rounded"
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
