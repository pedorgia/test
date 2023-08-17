<script setup>
import { ref } from 'vue'
import router from '../router'
const TODOvalue = ref('')
const TODOTaskValue = ref('')
const TODOtasks = ref([])

const emit = defineEmits(['addNewTODO', 'addTask'])

const addNewTODO = () => {
  //emit('addNewTODO', TODOvalue.value, TODOtasks.value)
  router.push('/home')
}
const addTask = () => {
  TODOtasks.value.push({
    text: TODOTaskValue.value,
    doneStatus: false
  })
  TODOTaskValue.value = ''
}
</script>

<template>
  <!-- <Teleport to="#app">
    <div class="modal-wrapper">-->
  <div class="modal">
    <div>
      Enter title:
      <input v-model="TODOvalue" @keydown.enter="addNewTODO" />
    </div>
    <div>
      Enter tasks:
      <input v-model="TODOTaskValue" @keydown.enter="addNewTODO" />
      <button @click="addTask" :disabled="!TODOTaskValue">Add task</button>
      <div v-if="TODOtasks.length > 0">
        <span>Tasks: </span>
        <div v-for="task in TODOtasks" :key="task.value">
          {{ task.text }}
        </div>
      </div>
    </div>
    <!-- <button @click="addNewTODO" :disabled="!TODOvalue">Create</button> -->
    <button @click="addNewTODO" :disabled="!TODOvalue">Create</button>
  </div>
  <!-- </div>
  </Teleport> -->
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
</style>
