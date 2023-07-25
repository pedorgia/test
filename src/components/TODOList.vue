<script setup>
import { defineProps } from 'vue'

const props = defineProps({ TODOArray: Array })
// const emit = defineEmits([])
</script>

<template>
  <div class="todo-list">
    <div v-for="(item, index) in props.TODOArray" :key="item.value" class="todo">
      <div class="title">{{ index + 1 }}. {{ item.title }}</div>
      <div v-for="task in item.tasks" :key="task.value" class="tasks">
        <input type="checkbox" id="checkbox" :disabled="true" />
        {{ task }}
      </div>
      <div v-if="item.tasks.length > 3">...</div>
    </div>
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
.todo {
  height: 200px;
  width: 150px;
  text-align: center;
  border: dashed;
  border-color: blue;
  margin-right: 30px;
  background-color: aqua;
  margin-bottom: 10px;
  cursor: pointer;
  overflow: hidden;

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
}
</style>
