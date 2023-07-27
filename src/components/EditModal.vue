<script setup>
const props = defineProps({ editIndex: Number, TODOArray: Array })

// const emit = defineEmits(['exitDeleteModal', 'deleteTODO'])

// const exitDeleteModal = () => {
//   emit('exitDeleteModal')
// }

// const deleteTODO = () => {
//   emit('deleteTODO', props.editIndex)
// }
</script>

<template>
  <Teleport to="#app">
    <div class="modal-wrapper">
      <div class="modal">
        <div class="title">{{ props.editIndex + 1 }}. {{ props.TODOArray[editIndex].title }}</div>
         <div v-for="task in props.TODOArray[editIndex].tasks" :key="task.value" class="tasks">
          <input type="checkbox" id="checkbox"/>
            {{ task }}
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
</style>
