<script setup>
import { reactive, watch, computed } from "vue";

const state = reactive({
  picked: "Title",
  textField: "",
  queryParams: "Title",
});

const emit = defineEmits({
  onFormSubmit(payload) {
    return payload;
  },
});

watch(
  () => state.picked,
  (newPicked) => {
    onSubmit();
  }
);

const inputLegend = computed(() =>
  state.picked === "Title" ? "Title name" : "Author name"
);

const onSubmit = () => {
  console.log("Form submit");
  switch (state.picked) {
    case "Title":
      state.queryParams = {
        q: `${state.textField}+intitle:${state.textField}`,
      };
      break;
    case "Author":
      state.queryParams = {
        q: `inauthor:${state.textField}`,
      };
      break;
    default:
      return;
  }
  emit("onFormSubmit", state.queryParams);
};
</script>

<template>
  <section class="search my-16">
    <form class="flex flex-col" @submit.prevent="onSubmit">
      <fieldset class="flex justify-center">
        <div class="flex items-center space-x-4 p-6 mx-6">
          <input
            id="title-input"
            v-model="state.picked"
            name="searchType"
            type="radio"
            value="Title"
          />
          <label for="title-input">Title</label>
        </div>
        <div class="flex items-center space-x-4 p-6 mx-6">
          <input
            id="author-input"
            v-model="state.picked"
            name="searchType"
            type="radio"
            value="Author"
          />
          <label for="author-input">Author</label>
        </div>
      </fieldset>
      <fieldset class="flex md:w-1/3 mx-auto">
        <legend>
          Search by: <b>{{ inputLegend }}</b>
        </legend>
        <input
          v-model="state.textField"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
        />
        <button
          class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 ml-4 rounded"
        >
          Search
        </button>
      </fieldset>
    </form>
  </section>
</template>
