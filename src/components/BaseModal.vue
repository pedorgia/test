<script setup>
defineProps({ submitText: String, cancelText: String, undoText: String, deleteText: String })
const emit = defineEmits(['handleSubmit', 'handleCancel', 'handleUndo', 'handleDelete'])
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper">
      <div class="modal">
        <slot name="title"></slot>
        <slot name="body"></slot>
        <div class="action-buttons">
          <v-button @onClick="emit('handleSubmit', undefined)">{{ submitText }}</v-button>
          <v-button v-if="undoText" @onClick="emit('handleUndo', undefined)">
            {{ undoText }}
          </v-button>
          <v-button v-if="deleteText" @onClick="emit('handleDelete', undefined)">
            {{ deleteText }}
          </v-button>
          <v-button @onClick="emit('handleCancel', undefined)">{{ cancelText }}</v-button>
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
