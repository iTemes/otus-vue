<script setup>
import { reactive, watch, computed } from "vue";

import getBooksFromParams from "../../api";

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

const onSubmit = () => {
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

  getBooksFromParams(state.queryParams)
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
  state.picked === "Title" ? "Title name" : "Author name"
);
</script>

<template>
  <section class="search">
    <form @submit.prevent="onSubmit">
      <fieldset>
        <div>Picked: {{ state.picked }}</div>

        <input
          id="title-input"
          v-model="state.picked"
          name="searchType"
          type="radio"
          value="Title"
        />
        <label for="title-input">Title</label>

        <input
          id="author-input"
          v-model="state.picked"
          name="searchType"
          type="radio"
          value="Author"
        />
        <label for="author-input">Author</label>
      </fieldset>
      <fieldset>
        <legend>{{ getInputLegend }}</legend>
        <input v-model="state.textField" type="text" />
        <button>Search</button>
      </fieldset>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
