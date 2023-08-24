<template>
  <div @click="emit('handleExpand', index)" class="open-details">
    <div class="title">{{ index + 1 }}. {{ item.title }}</div>
    <div v-for="task in item.tasks" :key="task.value" class="tasks">
      <input type="checkbox" id="checkbox" :disabled="true" v-model="task.doneStatus" />
      {{ task.text }}
    </div>
    <div v-show="item?.tasks?.length > 3" style="margin-bottom: 20px">...</div>
  </div>
  <div class="button-footer">
    <div class="todo-buttons">
      <v-button class="edit" @onClick="emit('handleEditItem', index)">Edit me</v-button>
      <button class="delete" @click="emit('handleDeleteItem', index)">Delete me</button>
    </div>
  </div>
</template>
<script setup>
defineProps({
  index: Number,
  item: { tasks: { text: String, doneStatus: Boolean }, title: String }
})

const emit = defineEmits(['handleEditItem', 'handleDeleteItem', 'handleExpand'])
</script>
