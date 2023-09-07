<script setup>
  import { ref } from 'vue';
  import BaseModal from '../common/BaseModal.vue';

  const props = defineProps({
    editedItem: { tasks: { text: String, doneStatus: Boolean }, title: String },
    editedItemIndex: Number,
  });

  const emit = defineEmits([
    'saveAndExit',
    'cancelAndExit',
    'openDeleteTODOFromEdit',
  ]);

  const isEditMode = ref(false);
  const isAddNewTask = ref(false);
  const changedTaskText = ref('');
  const newTaskText = ref('');
  const editedCurrentTask = ref(-1);
  const initialTODO = ref(JSON.parse(JSON.stringify(props.editedItem)));
  const preparedChanges = ref([]);

  const editTaskFromTODO = (taskIndex) => {
    isEditMode.value = true;
    editedCurrentTask.value = taskIndex;
    changedTaskText.value = initialTODO.value.tasks[taskIndex].text;
  };

  const deleteTaskFromTODO = (taskIndex) => {
    preparedChanges.value.push({
      editedTask: taskIndex,
      isToDelete: true,
    });
    initialTODO.value.tasks = initialTODO.value.tasks.filter(
      (_, index) => index != taskIndex
    );
  };

  const saveEditedTask = () => {
    if (
      changedTaskText.value !=
      initialTODO.value.tasks[editedCurrentTask.value].text
    ) {
      preparedChanges.value.push({
        editedTask: editedCurrentTask.value,
        newText: changedTaskText.value,
      });
      initialTODO.value.tasks[editedCurrentTask.value].text =
        changedTaskText.value;
    }
    editedCurrentTask.value = -1;
    changedTaskText.value = '';
    isEditMode.value = false;
  };

  const cancelChangesForTask = () => {
    editedCurrentTask.value = -1;
    changedTaskText.value = '';
    isEditMode.value = false;
  };

  const cancelChanges = () => {
    initialTODO.value = JSON.parse(JSON.stringify(props.editedItem));
    preparedChanges.value = [];
  };

  const changeDoneStatus = (taskIndex) => {
    preparedChanges.value.push({
      editedTask: taskIndex,
      newDoneStatus: !initialTODO.value.tasks[taskIndex].doneStatus,
    });
  };

  const saveNewTask = () => {
    initialTODO.value.tasks.push({
      text: newTaskText.value,
      doneStatus: false,
    });
    preparedChanges.value.push({
      editedTask: initialTODO.value.tasks.length,
      text: newTaskText.value,
      doneStatus: false,
    });
    isAddNewTask.value = false;
    newTaskText.value = '';
  };

  const cancelNewTask = () => {
    isAddNewTask.value = false;
    newTaskText.value = '';
  };
</script>

<template>
  <BaseModal
    submit-text="Save"
    undo-text="Undo"
    delete-text="Delete"
    cancel-text="Cancel"
    @handleSubmit="emit('saveAndExit', preparedChanges)"
    @handleUndo="cancelChanges"
    @handleDelete="emit('openDeleteTODOFromEdit')"
    @handleCancel="emit('cancelAndExit')"
  >
    <template v-slot:title>
      <div class="title">
        {{ editedItemIndex + 1 }}. {{ initialTODO.title }}
      </div>
    </template>
    <template v-slot:body>
      <div
        v-for="(task, taskIndex) in initialTODO.tasks"
        :key="task.value"
        class="tasks"
      >
        <div class="task-field">
          <div v-if="taskIndex != editedCurrentTask">
            <input
              type="checkbox"
              id="checkbox"
              @click="changeDoneStatus(taskIndex)"
              v-model="task.doneStatus"
            />
            {{ task.text }}
          </div>
          <div
            v-if="isEditMode && taskIndex == editedCurrentTask"
            class="editMode"
          >
            <input v-model="changedTaskText" />
            <v-button @onClick="saveEditedTask">Save</v-button>
            <v-button @onClick="cancelChangesForTask">Cancel</v-button>
          </div>
          <div v-if="taskIndex != editedCurrentTask" class="changeTaskButtons">
            <v-button @onClick="editTaskFromTODO(taskIndex)">Edit</v-button>
            <v-button @onClick="deleteTaskFromTODO(taskIndex)">Delete</v-button>
          </div>
        </div>
      </div>
      <div v-if="isAddNewTask">
        <input v-model="newTaskText" />
        <v-button @onClick="saveNewTask">Save</v-button>
        <v-button @onClick="cancelNewTask">Cancel</v-button>
      </div>
      <div v-if="!isAddNewTask">
        <v-button @onClick="isAddNewTask = !isAddNewTask">Add task</v-button>
      </div>
    </template>
  </BaseModal>
</template>
