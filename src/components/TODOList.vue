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
  changeTODOStatus,
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

const handleAddNewTODO = (title, desc) => {
  isAddModal.value = false;
  addNewTODO({ title, desc, isDone: false });
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

const changeTODODoneStatus = (index) => {
  changeTODOStatus(index);
};
</script>

<template>
  <div class="main-page">
    <div class="today-title">Today's todos</div>
    <div class="todo-list">
      <div
        v-for="(item, index) in todoList"
        :key="item.tasks"
        class="todo"
        @click="openDetails(index)"
      >
        <ShortCard
          :index="index"
          :item="item"
          @handleEditItem="openEditModal"
          @handleDeleteItem="openDeleteModal"
          @handleChangeStatus="changeTODODoneStatus"
        />
      </div>
    </div>
    <div class="main-button">
      <v-button @onClick="openAddModal" class="add-item-button">+</v-button>
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
.main-page {
  //background-color: #646fd4cf;
  background-image: linear-gradient(#646fd4cf, white);
  min-height: 100vh;
  position: relative;
}
.todo-list {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px 25px;
  height: 100%;
  width: 100%;
  padding: 0 25px;
}
.todo {
  //width: 300px;
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //font-size: 18px;
  border-radius: 17px;
  background-color: white;
  box-shadow: 0 4px 12px 0 gainsboro;
  position: relative;
  cursor: pointer;
}
// .todo:hover {
//   background-color: gainsboro;
// }

.main-button {
  position: absolute;
  bottom: 20px;
  text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  //height: 60px;
  width: 100%;
  .add-item-button {
    border: none;
    border-radius: 50%;
    color: white;
    font-weight: 600;
    height: 50px;
    width: 50px;
    //padding: 3px;
    cursor: pointer;
    font-size: 45px;
    text-align: center;
    background-color: #646fd4cf;
  }
}
.today-title {
  padding-top: 20px;
  font-family: Jost;
  color: white;
  font-size: 40px;
  text-align: center;
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
