<script setup>
import { ref } from "vue";
import BaseModal from "../common/BaseModal.vue";

const props = defineProps({
  editedItem: { tasks: { text: String, doneStatus: Boolean }, title: String },
  editedItemIndex: Number,
});

const emit = defineEmits([
  "saveAndExit",
  "cancelAndExit",
  "openDeleteTODOFromEdit",
]);

const isEditMode = ref(false);
const isAddNewTask = ref(false);
const changedTaskText = ref("");
const newTaskText = ref("");
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
  changedTaskText.value = "";
  isEditMode.value = false;
};

const cancelChangesForTask = () => {
  editedCurrentTask.value = -1;
  changedTaskText.value = "";
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
  newTaskText.value = "";
};

const cancelNewTask = () => {
  isAddNewTask.value = false;
  newTaskText.value = "";
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
        {{ initialTODO.title }}
      </div>
    </template>
    <template v-slot:body>
      <div
        v-for="(task, taskIndex) in initialTODO.tasks"
        :key="task.value"
        class="tasks"
      >
        <div class="task-field">
          <div v-show="taskIndex != editedCurrentTask" class="main-text">
            <input
              type="checkbox"
              id="checkbox"
              @click="changeDoneStatus(taskIndex)"
              v-model="task.doneStatus"
            />
            <div class="text">
              {{ task.text }}
            </div>
          </div>
          <div
            v-show="isEditMode && taskIndex == editedCurrentTask"
            class="edit-mode"
          >
            <input v-model="changedTaskText" />
            <div class="edit-task-buttons">
              <v-button @onClick="saveEditedTask" class="save">Save</v-button>
              <v-button @onClick="cancelChangesForTask" class="cancel"
                >Cancel</v-button
              >
            </div>
          </div>
          <div
            v-show="taskIndex != editedCurrentTask"
            class="changeTaskButtons"
          >
            <div class="task-buttons">
              <v-button class="edit" @onClick="editTaskFromTODO(taskIndex)"
                >Edit</v-button
              >
              <v-button class="delete" @onClick="deleteTaskFromTODO(taskIndex)"
                >Delete</v-button
              >
            </div>
          </div>
        </div>
      </div>
      <div v-show="isAddNewTask" class="new-task">
        <input v-model="newTaskText" class="input-new-task" />
        <div class="new-task-buttons">
          <v-button @onClick="saveNewTask" class="save">Save</v-button>
          <v-button @onClick="cancelNewTask" class="cancel">Cancel</v-button>
        </div>
      </div>
      <div v-show="!isAddNewTask" class="add-new-task">
        <v-button @onClick="isAddNewTask = !isAddNewTask">+ Add task</v-button>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss">
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
.task-field {
  display: flex;
  justify-content: space-between;
  input {
    margin-right: 8px;
  }
}

.main-text :hover {
  box-shadow: 0px 0px 10px 5px gainsboro;
  border-radius: 5px;
  padding-left: 5px;
}

.main-text {
  display: flex;
  align-items: center;
  height: 22px;
  .text {
    width: 240px;
  }
}

.edit-mode {
  display: flex;
  justify-content: space-between;
  input {
    width: 333px;
    font-size: 16px;
    margin-left: 20px;
    border: none;
    box-shadow: 0px 0px 10px 5px gainsboro;
    border-radius: 5px;
    padding-left: 5px;
  }
}

.edit-mode input :focus-visible {
  outline: none;
}
.changeTaskButtons {
  display: none;
  justify-content: right;
}

.tasks {
  margin-bottom: 10px;
  padding: 5px 0;
  min-height: 35px;
}

.tasks :hover .changeTaskButtons {
  display: flex;
}

.task-buttons button {
  margin-left: 10px;
  min-width: 40px;
  min-height: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 3px;
  cursor: pointer;
  font-size: 13px;
}

.task-buttons {
  .edit {
    background-color: rgb(0, 0, 255, 0.6);
  }
  .delete {
    background-color: rgb(255, 0, 0, 0.6);
  }
}

.add-new-task {
  text-align: center;
}

.add-new-task button {
  min-width: 80px;
  min-height: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 3px;
  cursor: pointer;
  font-size: 13px;
  background-color: rgba(220, 140, 10, 0.6);
}

.new-task-buttons {
  .save {
    background-color: rgb(0, 0, 255, 0.6);
  }
  .cancel {
    background-color: rgba(104, 100, 100, 0.6);
  }
}

.new-task {
  display: flex;
  justify-content: space-between;
  input {
    width: 333px;
    font-size: 16px;
    margin-left: 20px;
    border: none;
    box-shadow: 0px 0px 10px 5px gainsboro;
    border-radius: 5px;
    padding-left: 5px;
  }
}

.new-task-buttons button {
  margin-left: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 3px;
  cursor: pointer;
  font-size: 13px;

  min-width: 40px;
  min-height: 20px;
}

.edit-task-buttons {
  .save {
    background-color: rgb(0, 0, 255, 0.6);
  }
  .cancel {
    background-color: rgba(104, 100, 100, 0.6);
  }
}

.edit-task-buttons button {
  margin-left: 10px;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 3px;
  cursor: pointer;
  font-size: 13px;

  min-width: 40px;
  min-height: 20px;
}
</style>
