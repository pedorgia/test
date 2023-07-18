<script setup>
import TODOList from './components/TODOList.vue'
import AddModal from './components/addModal.vue'
import { ref } from 'vue'
const TODOListValue = ref([])

const isShowModal = ref(false)

const addNewTODO = (payload) => {
  isShowModal.value = false
  TODOListValue.value.push(payload)
}
</script>

<template>
  <TODOList :TODOArray="TODOListValue" />
  <AddModal v-if="isShowModal" @addNewTODO="addNewTODO" />
  <button @click="isShowModal = !isShowModal">Add Item</button>
</template>
