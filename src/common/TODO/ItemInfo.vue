<script setup>
defineProps({
  item: {
    tasks: { text: String, doneStatus: Boolean },
    title: String,
    desc: String,
  },
});
</script>

<template>
  <div class="title">{{ item.title }}</div>
  <!-- <div v-for="task in item.tasks" :key="task.value" class="task">
    <input
      type="checkbox"
      id="checkbox"
      :disabled="true"
      v-model="task.doneStatus"
    />
    {{ task.text }}
  </div> -->
  <div class="desc">{{ item.desc }}</div>
</template>

<style scoped>
.title {
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  /* text-transform: capitalize; */
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
}
.desc {
  width: 100%;
  text-align: left;
  font-size: 15px;
}
/* .task {
  margin-bottom: 10px;
  padding: 5px 0;
}

input {
  margin-right: 8px;
} */
</style>
