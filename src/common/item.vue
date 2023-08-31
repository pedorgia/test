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
  .open-details {
    cursor: pointer;
    height: 70%;
  }
  .title {
    padding-top: 10px;
    width: 100%;
    height: 20%;
    overflow-x: hidden;
    white-space: nowrap;
  }
  .tasks {
    text-align: left;
    /* display: none; */
  }
  /* .tasks:nth-child(-n + 4) {
    display: block;
  } */
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
</style>
