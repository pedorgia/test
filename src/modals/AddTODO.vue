<script setup>
import BaseModal from "../common/BaseModal.vue";
import { ref } from "vue";
const emit = defineEmits(["addNewTODO", "exitAddModal"]);
const TODOTaskValue = ref("");
const TODOtasks = ref([]);
const TODOTitleValue = ref("");

const addTask = () => {
  TODOtasks.value.push({
    text: TODOTaskValue.value,
    doneStatus: false,
  });
  TODOTaskValue.value = "";
};
</script>

<template>
  <BaseModal
    submit-text="Create"
    cancel-text="Cancel"
    @handleSubmit="emit('addNewTODO', TODOTitleValue, TODOtasks)"
    @handleCancel="emit('exitAddModal', undefined)"
  >
    <template v-slot:title> <div class="title">Create new TODO</div> </template>
    <template v-slot:body>
      <div class="title-input">
        <div>Enter title:</div>
        <input v-model="TODOTitleValue" />
      </div>
      <div class="tasks-block">
        <div class="tasks-input">
          Enter tasks:
          <input v-model="TODOTaskValue" />
        </div>

        <v-button @onClick="addTask" :disabled="!TODOTaskValue"
          >Add task</v-button
        >
        <div v-if="TODOtasks.length > 0">
          <span>Tasks: </span>
          <div v-for="task in TODOtasks" :key="task.value">
            {{ task.text }}
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.title {
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
}

.title-input {
  display: flex;
  input {
    margin-left: 10px;
  }
}

.tasks-input {
  display: flex;
  input {
    margin-left: 10px;
  }
}
</style>
