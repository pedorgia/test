<script setup>
import { defineProps } from 'vue'

const props = defineProps({ TODOArray: Array })
// const emit = defineEmits([])
const emit = defineEmits(['openDeleteModal', 'openEditModalPage', 'openAddModal'])

const openEditModalPage = (index) => {
  emit('openEditModalPage', index)
}

const openDeleteModal = (index) => {
  emit('openDeleteModal', index)
}

const openAddModal = () => {
  emit('openAddModal')
}
</script>

<template>
  <div class="main-button">
    <button @click="openAddModal" class="add-item-button">Add Item</button>
  </div>
  <div class="todo-list">
    <div v-for="(item, index) in props.TODOArray" :key="item.value" class="todo">
      <div class="title">{{ index + 1 }}. {{ item.title }}</div>
      <div v-for="task in item.tasks" :key="task.value" class="tasks">
        <input type="checkbox" id="checkbox" :disabled="true" v-model="task.doneStatus" />
        {{ task.text }}
      </div>
      <div v-show="item?.tasks?.length > 3" style="margin-bottom: 20px">...</div>
      <div class="button-footer">
        <div class="todo-buttons">
          <button class="edit" @click="openEditModalPage(index)">Edit me</button>
          <button class="delete" @click="openDeleteModal(index)">Delete me</button>
        </div>
      </div>
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
</style>
