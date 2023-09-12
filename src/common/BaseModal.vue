<script setup>
defineProps({
  submitText: String,
  cancelText: String,
  undoText: String,
  deleteText: String,
});
const emit = defineEmits([
  "handleSubmit",
  "handleCancel",
  "handleUndo",
  "handleDelete",
]);
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper">
      <div class="modal">
        <slot name="title"></slot>
        <slot name="body"></slot>
        <div class="action-buttons">
          <v-button @onClick="emit('handleSubmit', undefined)" class="submit">{{
            submitText
          }}</v-button>
          <v-button
            v-if="undoText"
            @onClick="emit('handleUndo', undefined)"
            class="undo"
          >
            {{ undoText }}
          </v-button>
          <v-button
            v-if="deleteText"
            @onClick="emit('handleDelete', undefined)"
            class="delete"
          >
            {{ deleteText }}
          </v-button>
          <v-button @onClick="emit('handleCancel', undefined)" class="cancel">{{
            cancelText
          }}</v-button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(1, 0, 0, 0.3);
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 500px;
  min-height: 180px;
  transform: translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  border-radius: 3px;
  padding: 1rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .submit {
    background-color: rgb(0, 0, 255, 0.6);
  }
  .delete {
    background-color: rgb(255, 0, 0, 0.6);
  }
  .cancel {
    background-color: rgba(104, 100, 100, 0.6);
  }
  .undo {
    background-color: rgba(13, 71, 16, 0.6);
  }
}
.action-buttons button {
  border: none;
  border-radius: 10px;
  color: white;
  padding: 3px;
  cursor: pointer;
  font-size: 13px;
  min-width: 55px;
  min-height: 25px;
}
</style>
