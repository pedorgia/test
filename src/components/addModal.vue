<script setup>
import { reactive } from 'vue'

const TODOtitle = ref('')
const newTODOInfo = reactive({})

const createNewTODO = () => {
  newTODOInfo = { ...newTODOInfo, TODOtitle }
}
</script>

<template>
  Enter your information:
  <input v-model="TODOtitle" />
  <button @click="createNewTODO">Create</button>
</template>

<style scoped></style>
