<script setup>
import TODOList from './components/TODOList.vue'
import AddModal from './components/addModal.vue'
import { ref } from 'vue'
const TODOListValue = ref([])

const isShowModal = ref(false)

const addNewTODO = (title, tasks) => {
  isShowModal.value = false
  console.log(title, tasks)
  TODOListValue.value.push({ title, tasks })
}
</script>

<template>
  <header>
    <div class="main-button">
      <button @click="isShowModal = !isShowModal" class="add-item-button">Add Item</button>
    </div>
  </header>
  <div class="todo-array">
    <TODOList :TODOArray="TODOListValue" />
  </div>
  <div>
    <AddModal v-if="isShowModal" @addNewTODO="addNewTODO" />
  </div>
</template>

<style scoped>
.todo-array {
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center;
  align-items: center; */
}
.main-button {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  .add-item-button {
    height: 90%;
    width: 60%;
    font-size: 30px;
    border: dashed;
    background-color: fuchsia;
    color: yellow;
    cursor: pointer;
  }
  .add-item-button:hover {
    background-color: palevioletred;
  }
}
</style>
