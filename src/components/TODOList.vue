<script setup>
import { ref } from "vue";
import AddTODO from "../modals/AddTODO.vue";
import router from "../router/index";
import DeleteTODO from "../modals/DeleteTODO.vue";
import EditTODO from "../modals/EditTODO.vue";
import ShortCard from "../common/TODO/ShortCard.vue";
import { useLocalStorage } from "../composables/store";

const isAddModal = ref(false);
const isDeleteModal = ref(false);
const isEditModal = ref(false);
const deleteIndex = ref(-1);
const editIndex = ref(-1);

const {
  todoList,
  addNewTODO,
  deleteTODO,
  editTextInTask,
  editDoneStatusInTask,
  addNewTask,
  deleteTask,
} = useLocalStorage();

const openDetails = (index) => {
  router.push({ name: "details", params: { id: index } });
};

const openAddModal = () => {
  isAddModal.value = true;
};

const exitAddModal = () => {
  isAddModal.value = false;
};

const openDeleteModal = (x) => {
  isDeleteModal.value = true;
  deleteIndex.value = x;
};

const exitDeleteModal = () => {
  isDeleteModal.value = false;
};

const openEditModal = (x) => {
  isEditModal.value = true;
  editIndex.value = x;
};

const handleAddNewTODO = (title, tasks) => {
  isAddModal.value = false;
  addNewTODO({ title, tasks });
};

const handleDeleteTODO = () => {
  deleteTODO(deleteIndex.value);
  exitDeleteModal();
};

const openDeleteTODOFromEdit = (x) => {
  isEditModal.value = false;
  isDeleteModal.value = true;
  deleteIndex.value = x || editIndex.value;
};

const cancelAndExit = () => {
  isEditModal.value = false;
  editIndex.value = -1;
};

const saveAndExit = (preparedChanges) => {
  for (let i = 0; i < preparedChanges.length; i++) {
    let x = preparedChanges[i];
    if ("newText" in x) {
      editTextInTask(editIndex.value, x.editedTask, x.newText);
    }
    if ("newDoneStatus" in x) {
      editDoneStatusInTask(editIndex.value, x.editedTask, x.newDoneStatus);
    }
    if ("text" in x) {
      addNewTask(editIndex.value, {
        text: x.text,
        doneStatus: x.doneStatus,
      });
    }
    if ("isToDelete" in x) {
      deleteTask(editIndex.value, x.editedTask);
    }
  }
  isEditModal.value = false;
  editIndex.value = -1;
};
</script>

<template>
  <div class="main-button">
    <v-button @onClick="openAddModal" class="add-item-button"
      >Add Item</v-button
    >
  </div>

  <div class="todo-list">
    <div v-for="(item, index) in todoList" :key="item.tasks" class="todo">
      <ShortCard
        :index="index"
        :item="item"
        @handleEditItem="openEditModal"
        @handleDeleteItem="openDeleteModal"
        @handleExpand="openDetails"
      />
    </div>
  </div>
  <AddTODO
    v-if="isAddModal"
    @addNewTODO="handleAddNewTODO"
    @exitAddModal="exitAddModal"
  />

  <DeleteTODO
    v-if="isDeleteModal"
    @deleteTODO="handleDeleteTODO"
    @exitDeleteModal="exitDeleteModal"
    :delete-item="todoList[deleteIndex]"
  />

  <EditTODO
    v-if="isEditModal"
    @saveAndExit="saveAndExit"
    @cancelAndExit="cancelAndExit"
    @openDeleteTODOFromEdit="openDeleteTODOFromEdit"
    :edited-item="todoList[editIndex]"
    :edited-item-index="editIndex"
  />
</template>

<style scoped lang="scss">
.todo-list {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px 25px;
  height: 100%;
  width: 100%;
  padding: 0 30px;
}
.todo {
  width: 300px;
  min-height: 265px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 18px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 12px 0 gainsboro;
  position: relative;
}
.todo:hover {
  background-color: gainsboro;
}

.main-button {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  .add-item-button {
    border: none;
    border-radius: 10px;
    color: white;
    padding: 3px;
    cursor: pointer;
    height: 90%;
    width: 60%;
    font-size: 30px;
    background-color: rgb(255, 0, 255, 0.6);
    cursor: pointer;
  }
  .add-item-button:hover {
    box-shadow: 0px 0px 10px 1px rgb(255, 0, 255, 0.6);
  }
}
/* button {
  margin: 5px;
  border: 2px;
  color: white;
  background-color: red;

  cursor: pointer;
  border-radius: 5px;
} */
</style>
