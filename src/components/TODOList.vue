<script setup>
import { ref, readonly } from 'vue'
import AddTODO from '../modals/AddTODO.vue'
import TODOItem from '../common/TODOItem.vue'

import router from '../router/index'
import DeleteTODO from '../modals/DeleteTODO.vue'
import EditTODO from '../modals/EditTODO.vue'
import ShortCard from '../common/TODO/ShortCard.vue'
import { useLocalStorage } from '../services/store'

const isAddModal = ref(false)
const isDeleteModal = ref(false)
const isEditModal = ref(false)
const deleteIndex = ref(-1)
const editIndex = ref(-1)

const {
  todoList,
  addNewTODO,
  deleteTODO,
  editTextInTask,
  editDoneStatusInTask,
  addNewTask,
  deleteTask
} = useLocalStorage()

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

const handleAddNewTODO = (title, tasks) => {
  isAddModal.value = false
  addNewTODO({ title, tasks })
}

const handleDeleteTODO = () => {
  deleteTODO(deleteIndex.value)
  exitDeleteModal()
}

const openDeleteTODOFromEdit = (x) => {
  isEditModal.value = false
  isDeleteModal.value = true
  deleteIndex.value = x || editIndex.value
}

const cancelAndExit = () => {
  isEditModal.value = false
  editIndex.value = -1
}

const saveAndExit = (preparedChanges) => {
  for (let i = 0; i < preparedChanges.length; i++) {
    let x = preparedChanges[i]
    if ('newText' in x) {
      editTextInTask(editIndex.value, x.editedTask, x.newText)
    }
    if ('newDoneStatus' in x) {
      editDoneStatusInTask(editIndex.value, x.editedTask, x.newDoneStatus)
    }
    if ('text' in x) {
      addNewTask(editIndex.value, {
        text: x.text,
        doneStatus: x.doneStatus
      })
    }
    if ('isToDelete' in x) {
      deleteTask(editIndex.value, x.editedTask)
    }
  }
  isEditModal.value = false
  editIndex.value = -1
}
</script>

<template>
  <div class="main-button">
    <v-button @onClick="openAddModal" class="add-item-button">Add Item</v-button>
  </div>

  <div class="todo-list">
    <div v-for="(item, index) in todoList" :key="item.tasks" class="todo">
      <ShortCard
        :index="index"
        :item="item"
        @handleEditItem="openEditModal"
        @handleDeleteItem="openDeleteModal"
        @handleExpand="openDetails"
      />
    </div>
  </div>
  <AddTODO v-if="isAddModal" @addNewTODO="handleAddNewTODO" @exitAddModal="exitAddModal" />

  <DeleteTODO
    v-if="isDeleteModal"
    @deleteTODO="handleDeleteTODO"
    @exitDeleteModal="exitDeleteModal"
    :delete-item="TODOArrayCopy[deleteIndex]"
  />

  <EditTODO
    v-if="isEditModal"
    @saveAndExit="saveAndExit"
    @cancelAndExit="cancelAndExit"
    @openDeleteTODOFromEdit="openDeleteTODOFromEdit"
    :edited-item="todoList[editIndex]"
    :edited-item-index="editIndex"
  />
</template>

<style scoped>
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(1, 0, 0, 0.3);
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;

  transform: translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  border-radius: 3px;
  padding: 1rem;
}
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

.tasks {
  height: 30px;
}

.task-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.editMode {
  display: flex;
  justify-content: space-between;
}

button {
  margin: 5px;
  border: 2px;
  color: white;
  background-color: red;

  cursor: pointer;
  border-radius: 5px;
}
button :hover {
  /* box-shadow: 5px 5px 20px rgba(159, 30, 30, 0.5); */
}
.changeTaskButtons {
  display: none;
}

.tasks :hover .changeTaskButtons {
  display: flex;
}
</style>
