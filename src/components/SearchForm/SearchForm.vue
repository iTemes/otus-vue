<script setup>
import { ref, watch, computed } from "vue";

import getBooksFromParams from "../../api";

const picked = ref("Title");
const textField = ref("");

const emit = defineEmits({
  onFormSubmit(payload) {
    return payload;
  },
});

const onSubmit = () => {
  console.log("Form Submit");
  let queryParams = null;

  switch (picked.value) {
    case "Title":
      queryParams = {
        q: `${textField.value}+intitle`,
      };
      break;
    case "Author":
      queryParams = {
        q: `${textField.value}+inauthor`,
      };
      break;
    default:
      return;
  }

  getBooksFromParams(queryParams)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) throw new Error(data.error);

      emit("onFormSubmit", data.items);
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

const getInputLegend = computed(() =>
  picked.value === "Title" ? "Title name" : "Author name"
);
</script>

<template>
  <section class="search">
    <form @submit.prevent="onSubmit">
      <fieldset>
        <div>Picked: {{ picked }}</div>

        <input
          id="title-input"
          v-model="picked"
          name="searchType"
          type="radio"
          value="Title"
        />
        <label for="title-input">Title</label>

        <input
          id="author-input"
          v-model="picked"
          name="searchType"
          type="radio"
          value="Author"
        />
        <label for="author-input">Author</label>
      </fieldset>
      <fieldset>
        <legend>{{ getInputLegend }}</legend>
        <input v-model="textField" type="text" />
        <button>Search</button>
      </fieldset>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
