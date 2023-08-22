<script setup lang="ts">
import TODODetails from '../components/TODODetails.vue'
import { store } from '../services/store'
</script>

<template>
  <main>
    <TODODetails :TODOArray="store.TODOArray" />
  </main>
</template>
