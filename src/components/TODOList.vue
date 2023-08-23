<script setup>
import { ref } from 'vue'
import AddModal from './AddModal.vue'
import DeleteModal from './DeleteModal.vue'
import EditModal from './EditModal.vue'
import { store } from '../services/store'
import router from '../router/index'

const isAddModal = ref(false)
const isDeleteModal = ref(false)
const isEditModal = ref(false)
const deleteIndex = ref(-1)
const editIndex = ref(-1)

const openDetails = (index) => {
  router.push({ name: 'details', params: { id: index } })
}

const openAddModal = () => {
  isAddModal.value = true
}

const exitAddModal = () => {
  isAddModal.value = false
}

const openDeleteModal = (x) => {
  isDeleteModal.value = true
  deleteIndex.value = x
}

const exitDeleteModal = () => {
  isDeleteModal.value = false
}

const openEditModal = (x) => {
  isEditModal.value = true
  editIndex.value = x
}

const addNewTODO = (title, tasks) => {
  isAddModal.value = false
  store.addNewTODO({ title, tasks })
}

const deleteTODO = (deleteIndex) => {
  store.deleteTODO(deleteIndex)
  exitDeleteModal()
}

const openDeleteTODOFromEdit = (x) => {
  isEditModal.value = false
  isDeleteModal.value = true
  deleteIndex.value = x
}

const cancelAndExit = () => {
  isEditModal.value = false
  editIndex.value = -1
}

const saveAndExit = (changesForTODOArray) => {
  for (let i = 0; i < changesForTODOArray.length; i++) {
    let x = changesForTODOArray[i]
    if ('newText' in x) {
      store.editTextInTask(x.editedTODO, x.editedTask, x.newText)
    }
    if ('newDoneStatus' in x) {
      store.editDoneStatusInTask(x.editedTODO, x.editedTask, x.newDoneStatus)
    }
    if ('text' in x) {
      store.addNewTask(x.editedTODO, {
        text: x.text,
        doneStatus: x.doneStatus
      })
    }
    if ('isToDelete' in x) {
      store.deleteTask(x.editedTODO, x.editedTask)
    }
  }
  isEditModal.value = false
  editIndex.value = -1
}
</script>

<template>
  <div class="main-button">
    <button @click="openAddModal" class="add-item-button">Add Item</button>
  </div>
  <div class="todo-list">
    <div v-for="(item, index) in store.TODOArray" :key="item.tasks" class="todo">
      <div @click="openDetails(index)" class="open-details">
        <div class="title">{{ index + 1 }}. {{ item.title }}</div>
        <div v-for="task in item.tasks" :key="task.value" class="tasks">
          <input type="checkbox" id="checkbox" :disabled="true" v-model="task.doneStatus" />
          {{ task.text }}
        </div>
        <div v-show="item?.tasks?.length > 3" style="margin-bottom: 20px">...</div>
      </div>
      <div class="button-footer">
        <div class="todo-buttons">
          <button class="edit" @click="openEditModal(index)">Edit me</button>
          <button class="delete" @click="openDeleteModal(index)">Delete me</button>
        </div>
      </div>
    </div>
  </div>
  <div>
    <AddModal v-if="isAddModal" @addNewTODO="addNewTODO" @exitAddModal="exitAddModal" />
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
      v-if="isEditModal"
      :editIndex="editIndex"
      @openDeleteTODOFromEdit="openDeleteTODOFromEdit"
      @cancelAndExit="cancelAndExit"
      @saveAndExit="saveAndExit"
    />
  </div>
</template>

<style scoped>
.todo-list {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: center; */

  height: 100%;
  width: 100%;
}
.open-details {
  cursor: pointer;
  height: 70%;
}
.todo {
  height: 200px;
  width: 150px;
  text-align: center;
  border: dashed;
  border-color: blue;
  margin-right: 30px;
  background-color: aqua;
  margin-bottom: 10px;
  /* cursor: pointer; */
  overflow: hidden;
  position: relative;

  .title {
    padding-top: 10px;
    width: 100%;
    height: 20%;
    overflow-x: hidden;
    white-space: nowrap;
  }
  .tasks {
    text-align: left;
    display: none;
  }
  .tasks:nth-child(-n + 4) {
    display: block;
  }
  .todo-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .delete {
    background-color: coral;
    color: white;
    width: 40%;
    cursor: pointer;
  }
  .edit {
    background-color: coral;
    color: white;
    width: 40%;
    cursor: pointer;
  }
  .button-footer {
    position: absolute;
    bottom: 20px;
    left: 5px;
  }
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
.todo-array {
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center;
  align-items: center; */
}
</style>
