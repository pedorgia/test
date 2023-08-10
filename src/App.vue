<script setup>
// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

import { RouterLink, RouterView, useRouter } from 'vue-router'

import DeleteModal from './components/DeleteModal.vue'
import TODOList from './components/TODOList.vue'
import AddModal from './components/AddModal.vue'
import { ref } from 'vue'
import EditModal from './components/EditModal.vue'

const router = useRouter()

const handleClick = (url) => {
  router.push(url)
  console.log(url)
}

const TODOListValue = ref(JSON.parse(localStorage.getItem('TODOArray')) || [])

const isAddModal = ref(false)
const isDeleteModal = ref(false)
const isEditModalPage = ref(false)
const deleteIndex = ref(-1)
const editIndex = ref(-1)

const addNewTODO = (title, tasks) => {
  isAddModal.value = false
  TODOListValue.value.push({ title, tasks })
  localStorage.setItem('TODOArray', JSON.stringify(TODOListValue.value))
  console.log(JSON.parse(localStorage.getItem('TODOArray')))
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
  localStorage.setItem('TODOArray', JSON.stringify(TODOListValue.value))
  exitDeleteModal()
}

const openDeleteTODOFromEdit = (x) => {
  // console.log('in App to delete from edit modal')
  // console.log(x)
  isEditModalPage.value = false
  isDeleteModal.value = true
  deleteIndex.value = x
  localStorage.setItem('TODOArray', JSON.stringify(TODOListValue.value))
}

// const deleteTaskFromTODO = (TODOindex, taskIndex) => {
//   TODOListValue.value[TODOindex].tasks = TODOListValue.value[TODOindex].tasks.filter(
//     (_, ind) => ind != taskIndex
//   )
// }

// const saveEditedTask = (TODOindex, taskIndex, newText) => {saveAndExit
//   TODOListValue.value[TODOindex].tasks[taskIndex].text = newText
//   // isEditModalPage.value = false
//   // editIndex.value = -1
// }

const cancelAndExit = () => {
  //TODOListValue.value[editIndex] = { ...initialTODO }
  isEditModalPage.value = false
  editIndex.value = -1
  localStorage.setItem('TODOArray', JSON.stringify(TODOListValue.value))
}

const saveAndExit = (changesForTODOArray) => {
  for (let i = 0; i < changesForTODOArray.length; i++) {
    let x = changesForTODOArray[i]
    if ('newText' in x) {
      TODOListValue.value[x.editedTODO].tasks[x.editedTask].text = x.newText
    }
    if ('newDoneStatus' in x) {
      TODOListValue.value[x.editedTODO].tasks[x.editedTask].doneStatus = x.newDoneStatus
    }
    if ('text' in x) {
      TODOListValue.value[x.editedTODO].tasks.push({
        text: x.text,
        doneStatus: x.doneStatus
      })
    }
    if ('isToDelete' in x) {
      TODOListValue.value[x.editedTODO].tasks = TODOListValue.value[x.editedTODO].tasks.filter(
        (_, ind) => ind != x.editedTask
      )
    }
  }
  isEditModalPage.value = false
  editIndex.value = -1
  localStorage.setItem('TODOArray', JSON.stringify(TODOListValue.value))
}
</script>

<template>
  <header>
    <div class="main-button">
      <button @click="isAddModal = !isAddModal" class="add-item-button">Add Item</button>
    </div>
  </header>
  <div class="todo-array">
    <TODOList
      :TODOArray="TODOListValue"
      @openDeleteModal="openDeleteModal"
      @openEditModalPage="openEditModalPage"
    />
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
    <EditModal
      v-if="isEditModalPage"
      :editIndex="editIndex"
      :TODOArray="TODOListValue"
      @openDeleteTODOFromEdit="openDeleteTODOFromEdit"
      @cancelAndExit="cancelAndExit"
      @saveAndExit="saveAndExit"
    />
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
