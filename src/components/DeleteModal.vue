<script setup>
const props = defineProps({ deleteIndex: Number })

const emit = defineEmits(['exitDeleteModal', 'deleteTODO'])

const exitDeleteModal = () => {
  emit('exitDeleteModal')
}

const deleteTODO = () => {
  emit('deleteTODO', props.deleteIndex)
}
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper">
      <div class="modal">
        <div class="question">Really delete?</div>
        <div class="yes-no-buttons">
          <button @click="deleteTODO">Yes</button>
          <button @click="exitDeleteModal">No</button>
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

  transform: translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  border-radius: 3px;
  padding: 1rem;
}
.yes-no-buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    color: blue;
  }
}

.question {
  text-align: center;
  margin-bottom: 10px;
}
</style>
