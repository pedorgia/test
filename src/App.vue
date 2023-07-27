<script setup>
// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)
import DeleteModal from './components/DeleteModal.vue'
import TODOList from './components/TODOList.vue'
import AddModal from './components/addModal.vue'
import { ref } from 'vue'
import EditModal from './components/EditModal.vue';
const TODOListValue = ref([])

const isAddModal = ref(false)
const isDeleteModal = ref(false)
const isEditModalPage = ref(false)
const deleteIndex = ref(-1)
const editIndex = ref(-1)

const addNewTODO = (title, tasks) => {
  isAddModal.value = false
  TODOListValue.value.push({ title, tasks })
}
const openDeleteModal = (x) => {
  isDeleteModal.value = true
  deleteIndex.value = x
}

const exitDeleteModal = () => {
  isDeleteModal.value = false
}

const openEditModalPage = (x) => {
  isEditModalPage.value = true
  editIndex.value = x
}

const deleteTODO = (deleteIndex) => {
  TODOListValue.value = TODOListValue.value.filter((_, index) => index != deleteIndex)
  exitDeleteModal()
}
</script>

<template>
  <header>
    <div class="main-button">
      <button @click="isAddModal = !isAddModal" class="add-item-button">Add Item</button>
    </div>
  </header>
  <div class="todo-array">
    <TODOList :TODOArray="TODOListValue" 
    @openDeleteModal="openDeleteModal" 
    @openEditModalPage="openEditModalPage" />
  </div>
  <div>
    <AddModal v-if="isAddModal" @addNewTODO="addNewTODO" />
  </div>
  <div>
    <DeleteModal
      v-if="isDeleteModal"
      :deleteIndex="deleteIndex"
      @exitDeleteModal="exitDeleteModal"
      @deleteTODO="deleteTODO"
    />
  </div>
  <div>
    <EditModal v-if="isEditModalPage" 
    :editIndex="editIndex"
    :TODOArray="TODOListValue" />
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
