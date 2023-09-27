<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: signika;
  box-sizing: border-box !important;
}
input[type="text"] {
  font-family: inherit; /* 1 */
  font-size: inherit; /* 1 */
  line-height: inherit; /* 1 */
  margin: 0; /* 2 */
}
</style>
