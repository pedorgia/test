<script setup>
import { ref } from 'vue'
const TODOvalue = ref('')

const emit = defineEmits(['addNewTODO'])

const addNewTODO = () => {
  emit('addNewTODO', TODOvalue.value)
}
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper">
      <div class="modal">
        Enter your information:
        <input v-model="TODOvalue" @keydown.enter="addNewTODO" />
        <button @click="addNewTODO">Create</button>
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

  transform: translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  border-radius: 3px;
  padding: 1rem;
}
</style>
