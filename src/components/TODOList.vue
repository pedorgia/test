<script setup>
import { reactive } from 'vue'
import { addModal } from '../components/addModal.vue'

const TODOArray = reactive([])

const newTODOInfo = reactive({})

const openAddModal = () => {
  addModal
}

const addNewTODO = () => {
  openAddModal()
}
</script>

<template>
  Hello from TODOList
  <ul>
    <li v-for="item in TODOArray" :key="item.value">
      {{ item }}
    </li>
  </ul>
  <button @click="addNewTODO">Add new TODO</button>
</template>

<style scoped></style>
