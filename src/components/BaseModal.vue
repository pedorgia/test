<script setup>
defineProps({ submitText: String, cancelText: String, undoText: String, deleteText: String })
const emit = defineEmits(['handleSubmit', 'handleCancel'])
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper">
      <div class="modal">
        <slot name="title"></slot>
        <slot name="body"></slot>
        <div class="action-buttons">
          <button @click="emit('handleSubmit', undefined)">{{ submitText }}</button>
          <button v-if="undoText" @click="emit('handleUndo', undefined)">
            {{ undoText }}
          </button>
          <button v-if="deleteText" @click="emit('handleDelete', undefined)">
            {{ deleteText }}
          </button>
          <button @click="emit('handleCancel', undefined)">{{ cancelText }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
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

  transform: translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  border-radius: 3px;
  padding: 1rem;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
