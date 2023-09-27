<script setup>
import BaseModal from "../common/BaseModal.vue";
import { ref } from "vue";
const emit = defineEmits(["addNewTODO", "exitAddModal"]);
const DescValue = ref("");
// const TODOTaskValue = ref("");
// const TODOtasks = ref([]);
const TitleValue = ref("");

// const addTask = () => {
//   TODOtasks.value.push({
//     text: TODOTaskValue.value,
//     doneStatus: false,
//   });
//   TODOTaskValue.value = "";
// };
</script>

<template>
  <BaseModal
    submit-text="Ok"
    cancel-text="Cancel"
    @handleSubmit="emit('addNewTODO', TitleValue, DescValue)"
    @handleCancel="emit('exitAddModal', undefined)"
  >
    <template v-slot:title> <div class="title">New todo list</div> </template>
    <template v-slot:body>
      <!-- <div class="title-input">
        <div>Enter title:</div>
        <input v-model="TODOTitleValue" />
      </div> -->
      <div class="title-field">
        <input
          v-model="TitleValue"
          class="title-field__input"
          type="text"
          name="title"
          id="title"
          placeholder="Enter your title"
        />
      </div>
      <div class="desc-field">
        <input
          v-model="DescValue"
          class="desc-field__input"
          type="text"
          name="desc"
          id="desc"
          placeholder="Enter description"
        />
      </div>
      <!-- <div class="tasks-block">
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
      </div> -->
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.title {
  width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  // text-transform: capitalize;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  margin-bottom: 15px;
}

.title-field,
.desc-field {
  margin-bottom: 1rem;
}
/* стили для label */
.title-field__label,
.desc-field__label {
  display: block;
  margin-bottom: 0.25rem;
}
/* стили для input */
.title-field__input,
.desc-field__input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.title-field__input::placeholder,
.desc-field__input::placeholder {
  color: #212529;
  opacity: 0.4;
}

.title-field__input:focus,
.desc-field__input:focus {
  color: #212529;
  background-color: #fff;
  border-color: #bdbdbd;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
}
</style>
