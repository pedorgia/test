<script setup>
import { TODOArray } from '../services/store'
import router from '../router/index'
import { readonly } from 'vue'
import TODOItem from '../TODOItem.vue'

defineProps({
  index: Number,
  item: { tasks: { text: String, doneStatus: Boolean }, title: String }
})

const TODOArrayCopy = readonly(TODOArray)
</script>

<template>
  <div class="modal">
    <TODOItem
      :index="index"
      :item="item"
      @handleEditItem="openEditModal"
      @handleDeleteItem="openDeleteModal"
      @handleExpand="openDetails"
    >
    </TODOItem>
    <div class="title">
      {{ Number($route.params.id) + 1 }}.
      {{ TODOArrayCopy[$route.params.id].title }}
    </div>
    <div v-for="task in TODOArrayCopy[$route.params.id].tasks" :key="task.value" class="tasks">
      <div class="task-field">
        <div>
          <input type="checkbox" id="checkbox" v-model="task.doneStatus" :disabled="true" />
          {{ task.text }}
        </div>
      </div>
    </div>
    <div>
      <v-button @onClick="router.push({ name: 'home' })">Go back to main page</v-button>
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
