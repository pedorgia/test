<script setup>
import { defineProps } from 'vue'

const props = defineProps({ TODOArray: Array })
// const emit = defineEmits([])
</script>

<template>
  Hello from TODOList
  <ul>
    <li v-for="item in props.TODOArray" :key="item.value">
      {{ item }}
    </li>
  </ul>
</template>

<style scoped></style>
