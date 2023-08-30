<script setup>
  import BaseModal from './BaseModal.vue';

  const TODOTaskValue = ref('');
  const TODOtasks = ref([]);

  const addTask = () => {
    TODOtasks.value.push({
      text: TODOTaskValue.value,
      doneStatus: false,
    });
    TODOTaskValue.value = '';
  };
</script>

<template>
  <BaseModal
    submit-text="Create"
    cancel-text="Cancel"
    v-if="isAddModal"
    @handleSubmit="addNewTODO"
    @handleCancel="exitAddModal"
  >
    <template v-slot:title>
      <div>
        Enter title:
        <input v-model="TODOvalue" />
      </div>
    </template>
    <template v-slot:body>
      <div>
        Enter tasks:
        <input v-model="TODOTaskValue" />
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
