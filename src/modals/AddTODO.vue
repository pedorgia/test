<script setup>
  import BaseModal from '../common/BaseModal.vue';
  import { ref } from 'vue';
  const emit = defineEmits(['addNewTODO', 'exitAddModal']);
  const TODOTaskValue = ref('');
  const TODOtasks = ref([]);
  const TODOTitleValue = ref('');

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
    @handleSubmit="emit('addNewTODO', TODOTitleValue, TODOtasks)"
    @handleCancel="emit('exitAddModal', undefined)"
  >
    <template v-slot:title>
      <div>
        Enter title:
        <input v-model="TODOTitleValue" />
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
