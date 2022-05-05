<script setup>
import { reactive } from "vue";

import PageHeader from "./views/general/PageHeader/PageHeader.vue";
</script>

<template>
  <PageHeader />
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
