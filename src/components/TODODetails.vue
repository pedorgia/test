<script setup>
import { store } from '../services/store'
import router from '../router/index'
</script>

<template>
  <div class="modal">
    <div class="title">
      {{ Number($route.params.id) + 1 }}. {{ store.TODOArray[$route.params.id].title }}
    </div>
    <div v-for="task in store.TODOArray[$route.params.id].tasks" :key="task.value" class="tasks">
      <div class="task-field">
        <div>
          <input type="checkbox" id="checkbox" v-model="task.doneStatus" :disabled="true" />
          {{ task.text }}
        </div>
      </div>
    </div>
    <div>
      <button @click="router.push({ name: 'home' })">Go back to main page</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
// button :hover {
//   //box-shadow: 5px 5px 20px rgba(159, 30, 30, 0.5);
// }
.changeTaskButtons {
  display: none;
}

.tasks :hover .changeTaskButtons {
  display: flex;
}
</style>
