<script setup>
import { ref, readonly } from 'vue'
//import BaseModal from './BaseModal.vue'
import AddTODO from '../modals/AddTODO.vue'
import TODOItem from '../common/TODOItem.vue'
//import EditModal from './EditModal.vue'
import { TODOArray, actions } from '../services/store'
import router from '../router/index'
import DeleteTODO from '../modals/DeleteTODO.vue'
import EditTODO from '../modals/EditTODO.vue'

const isAddModal = ref(false)
const isDeleteModal = ref(false)
const isEditModal = ref(false)
const deleteIndex = ref(-1)
const editIndex = ref(-1)
//const TODOvalue = ref('')
//const TODOTaskValue = ref('');
//const TODOtasks = ref([])

// const isEditMode = ref(false)
// const isAddNewTask = ref(false)
// const changedTaskText = ref('')
// const newTaskText = ref('')
// const editedCurrentTask = ref(-1)
const TODOArrayCopy = readonly(TODOArray)
//const initialTODO = ref(JSON.parse(JSON.stringify(store.TODOArray[editIndex.value])) || [])
// const initialTODOArray = ref(JSON.parse(JSON.stringify(TODOArrayCopy)))
// const preparedChanges = ref([])

// const editTaskFromTODO = (taskIndex) => {
//   isEditMode.value = true
//   editedCurrentTask.value = taskIndex
//   changedTaskText.value = initialTODOArray.value[editIndex.value].tasks[taskIndex].text
// }

// const deleteTaskFromTODO = (taskIndex) => {
//   preparedChanges.value.push({
//     editedTODO: editIndex.value,
//     editedTask: taskIndex,
//     isToDelete: true
//   })
//   initialTODOArray.value[editIndex.value].tasks = initialTODOArray.value[
//     editIndex.value
//   ].tasks.filter((_, index) => index != taskIndex)
// }

// const saveEditedTask = () => {
//   if (
//     changedTaskText.value !=
//     initialTODOArray.value[editIndex.value].tasks[editedCurrentTask.value].text
//   ) {
//     preparedChanges.value.push({
//       editedTODO: editIndex.value,
//       editedTask: editedCurrentTask.value,
//       newText: changedTaskText.value
//     })
//     initialTODOArray.value[editIndex.value].tasks[editedCurrentTask.value].text =
//       changedTaskText.value
//   }
//   editedCurrentTask.value = -1
//   changedTaskText.value = ''
//   isEditMode.value = false
// }

// const cancelChangesForTask = () => {
//   editedCurrentTask.value = -1
//   changedTaskText.value = ''
//   isEditMode.value = false
// }

// const cancelChanges = () => {
//   initialTODOArray.value[editIndex.value] = JSON.parse(
//     JSON.stringify(TODOArrayCopy[editIndex.value])
//   )
//   preparedChanges.value = []
// }

// const changeDoneStatus = (taskIndex) => {
//   preparedChanges.value.push({
//     editedTODO: editIndex.value,
//     editedTask: taskIndex,
//     newDoneStatus: !initialTODOArray.value[editIndex.value].tasks[taskIndex].doneStatus
//   })
// }

// const saveNewTask = () => {
//   initialTODOArray.value[editIndex.value].tasks.push({
//     text: newTaskText.value,
//     doneStatus: false
//   })
//   preparedChanges.value.push({
//     editedTODO: editIndex.value,
//     editedTask: initialTODOArray.value[editIndex.value].tasks.length,
//     text: newTaskText.value,
//     doneStatus: false
//   })
//   isAddNewTask.value = false
//   newTaskText.value = ''
// }

// const cancelNewTask = () => {
//   isAddNewTask.value = false
//   newTaskText.value = ''
// }

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
  actions.addNewTODO({ title, tasks })
}

const deleteTODO = () => {
  actions.deleteTODO(deleteIndex.value)
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
      actions.editTextInTask(editIndex.value, x.editedTask, x.newText)
    }
    if ('newDoneStatus' in x) {
      actions.editDoneStatusInTask(editIndex.value, x.editedTask, x.newDoneStatus)
    }
    if ('text' in x) {
      actions.addNewTask(editIndex.value, {
        text: x.text,
        doneStatus: x.doneStatus
      })
    }
    if ('isToDelete' in x) {
      actions.deleteTask(editIndex.value, x.editedTask)
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
    <div v-for="(item, index) in TODOArrayCopy" :key="item.tasks" class="todo">
      <TODOItem
        :index="index"
        :item="item"
        @handleEditItem="openEditModal"
        @handleDeleteItem="openDeleteModal"
        @handleExpand="openDetails"
      />
    </div>
  </div>
  <AddTODO v-if="isAddModal" @addNewTODO="addNewTODO" @exitAddModal="exitAddModal" />
  <!-- <BaseModal
      submit-text="Create"
      cancel-text="Cancel"
      v-if="isAddModal"
      @handleSubmit="addNewTODO"
      @handleCancel="exitAddModal"
    >
      <template v-slot:title>
        <div>
          Enter title:
          <input v-model="TODOvalue" />
        </div>
      </template>
      <template v-slot:body>
        
      </template> -->

  <!-- <template v-slot:title>
        <div>
          Enter title:
          <input v-model="TODOvalue" /></div
      ></template>
      <template v-slot:body>
        <div>
          Enter tasks:
          <input v-model="TODOTaskValue" />
          <v-button @onClick="addTask" :disabled="!TODOTaskValue">Add task</v-button>
          <div v-if="TODOtasks.length > 0">
            <span>Tasks: </span>
            <div v-for="task in TODOtasks" :key="task.value">
              {{ task.text }}
            </div>
          </div>
        </div>
      </template> 
    </BaseModal>-->
  <DeleteTODO
    v-if="isDeleteModal"
    @deleteTODO="deleteTODO"
    @exitDeleteModal="exitDeleteModal"
    :delete-item="TODOArrayCopy[deleteIndex]"
  />
  <!-- <BaseModal
      submit-text="Delete"
      cancel-text="Cancel"
      v-if="isDeleteModal"
      @handleSubmit="deleteTODO"
      @handleCancel="exitDeleteModal"
    >
      <template v-slot:body>
        <div>
          <div>
            <div class="question">Really delete?</div>
          </div>
        </div>
      </template>
    </BaseModal> -->

  <EditTODO
    v-if="isEditModal"
    @saveAndExit="saveAndExit"
    @cancelAndExit="cancelAndExit"
    @openDeleteTODOFromEdit="openDeleteTODOFromEdit"
    :edited-item="TODOArrayCopy[editIndex]"
    :edited-item-index="editIndex"
  />
  <!-- <BaseModal
      submit-text="Save"
      undo-text="Undo"
      delete-text="Delete"
      cancel-text="Cancel"
      v-if="isEditModal"
      @handleSubmit="saveAndExit"
      @handleUndo="cancelChanges"
      @handleDelete="openDeleteTODOFromEdit"
      @handleCancel="cancelAndExit"
    >
      <template v-slot:title>
        <div class="title">{{ editIndex + 1 }}. {{ initialTODOArray[editIndex].title }}</div>
      </template>
      <template v-slot:body>
        <div
          v-for="(task, taskIndex) in initialTODOArray[editIndex].tasks"
          :key="task.value"
          class="tasks"
        >
          <div class="task-field">
            <div v-if="taskIndex != editedCurrentTask">
              <input
                type="checkbox"
                id="checkbox"
                @click="changeDoneStatus(taskIndex)"
                v-model="task.doneStatus"
              />
              {{ task.text }}
            </div>
            <div v-if="isEditMode && taskIndex == editedCurrentTask" class="editMode">
              <input v-model="changedTaskText" />
              <v-button @onClick="saveEditedTask">Save</v-button>
              <v-button @onClick="cancelChangesForTask">Cancel</v-button>
            </div>
            <div v-if="taskIndex != editedCurrentTask" class="changeTaskButtons">
              <v-button @onClick="editTaskFromTODO(taskIndex)">Edit</v-button>
              <v-button @onClick="deleteTaskFromTODO(taskIndex)">Delete</v-button>
            </div>
          </div>
        </div>
        <div v-if="isAddNewTask">
          <input v-model="newTaskText" />
          <v-button @onClick="saveNewTask">Save</v-button>
          <v-button @onClick="cancelNewTask">Cancel</v-button>
        </div>
        <div v-if="!isAddNewTask">
          <v-button @onClick="isAddNewTask = !isAddNewTask">Add task</v-button>
        </div>
      </template>
    </BaseModal> -->
  <!-- <EditModal
      v-if="isEditModal"
      :editIndex="editIndex"
      @openDeleteTODOFromEdit="openDeleteTODOFromEdit"
      @cancelAndExit="cancelAndExit"
      @saveAndExit="saveAndExit"
    /> -->
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
