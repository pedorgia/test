<script setup>
  defineProps({
    index: Number,
    item: { tasks: { text: String, doneStatus: Boolean }, title: String },
  });
</script>

<template>
  <div class="title">{{ index + 1 }}. {{ item.title }}</div>
  <div v-for="task in item.tasks" :key="task.value" class="tasks">
    <input
      type="checkbox"
      id="checkbox"
      :disabled="true"
      v-model="task.doneStatus"
    />
    {{ task.text }}
  </div>
</template>

<style scoped>
  .title {
    padding-top: 10px;
    width: 100%;
    height: 20%;
    overflow-x: hidden;
    white-space: nowrap;
  }
  .tasks {
    text-align: left;
  }
</style>
