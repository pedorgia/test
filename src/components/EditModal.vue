<script setup>
const props = defineProps({
  editIndex: Number,
  TODOArray: Array
})
import { ref } from 'vue'

const emit = defineEmits(['openDeleteTODOFromEdit', 'cancelAndExit', 'saveAndExit'])

const isEditMode = ref(false)
const isAddNewTask = ref(false)
const changedTaskText = ref('')
const newTaskText = ref('')
const editedCurrentTask = ref(-1)
//const initialTODO = ref({ ...props.TODOArray[props.editIndex] })
const initialTODO = ref(JSON.parse(JSON.stringify(props.TODOArray[props.editIndex])))
const preparedChanges = ref([])

// const exitDeleteModal = () => {
//   emit('exitDeleteModal')
// }
const editTaskFromTODO = (taskIndex) => {
  isEditMode.value = true
  editedCurrentTask.value = taskIndex
  changedTaskText.value = initialTODO.value.tasks[taskIndex].text
}

// const editTaskFromTODO = (taskIndex) => {
//   emit('editTaskFromTODO', props.editIndex, taskIndex)
// }

const deleteTaskFromTODO = (taskIndex) => {
  preparedChanges.value.push({
    editedTODO: props.editIndex,
    editedTask: taskIndex,
    isToDelete: true
  })
  initialTODO.value.tasks = initialTODO.value.tasks.filter((_, index) => index != taskIndex)
  //emit('deleteTaskFromTODO', props.editIndex, taskIndex)
}

const openDeleteTODOFromEdit = () => {
  emit('openDeleteTODOFromEdit', props.editIndex)
}

const saveEditedTask = () => {
  if (changedTaskText.value != initialTODO.value.tasks[editedCurrentTask.value].text) {
    //emit('saveEditedTask', props.editIndex, editedCurrentTask.value, changedTaskText.value)
    preparedChanges.value.push({
      editedTODO: props.editIndex,
      editedTask: editedCurrentTask.value,
      newText: changedTaskText.value
    })
    initialTODO.value.tasks[editedCurrentTask.value].text = changedTaskText.value
  }
  editedCurrentTask.value = -1
  changedTaskText.value = ''
  isEditMode.value = false
}

const cancelChangesForTask = () => {
  editedCurrentTask.value = -1
  changedTaskText.value = ''
  isEditMode.value = false
}

const cancelAndExit = () => {
  emit('cancelAndExit')
}

const saveAndExit = () => {
  emit('saveAndExit', preparedChanges.value)
}

const cancelChanges = () => {
  initialTODO.value = JSON.parse(JSON.stringify(props.TODOArray[props.editIndex]))
  preparedChanges.value = []
}

const changeDoneStatus = (taskIndex) => {
  preparedChanges.value.push({
    editedTODO: props.editIndex,
    editedTask: taskIndex,
    newDoneStatus: !initialTODO.value.tasks[taskIndex].doneStatus
  })
}

const saveNewTask = () => {
  initialTODO.value.tasks.push({
    text: newTaskText.value,
    doneStatus: false
  })
  preparedChanges.value.push({
    editedTODO: props.editIndex,
    editedTask: props.TODOArray[props.editIndex].tasks.length,
    text: newTaskText.value,
    doneStatus: false
  })
  isAddNewTask.value = false
  newTaskText.value = ''
}
const cancelNewTask = () => {
  isAddNewTask.value = false
  newTaskText.value = ''
}
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper">
      <div class="modal">
        <div class="title">{{ props.editIndex + 1 }}. {{ initialTODO.title }}</div>
        <div v-for="(task, taskIndex) in initialTODO.tasks" :key="task.value" class="tasks">
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
              <button @click="saveEditedTask">Save</button>
              <button @click="cancelChangesForTask">Cancel</button>
            </div>
            <div v-if="taskIndex != editedCurrentTask" class="changeTaskButtons">
              <button @click="editTaskFromTODO(taskIndex)">Edit</button>
              <button @click="deleteTaskFromTODO(taskIndex)">Delete</button>
            </div>
          </div>
        </div>
        <div v-if="isAddNewTask">
          <input v-model="newTaskText" />
          <button @click="saveNewTask">Save</button>
          <button @click="cancelNewTask">Cancel</button>
        </div>
        <div v-if="!isAddNewTask">
          <button @click="isAddNewTask = !isAddNewTask">Add task</button>
        </div>
        <div>
          <button @click="saveAndExit">Save</button>
          <button @click="cancelChanges">Undo</button>
          <button @click="openDeleteTODOFromEdit">Delete</button>
          <button @click="cancelAndExit">Cancel</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
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
  //box-shadow: 5px 5px 20px rgba(159, 30, 30, 0.5);
}
.changeTaskButtons {
  display: none;
}

.tasks :hover .changeTaskButtons {
  display: flex;
}
</style>
