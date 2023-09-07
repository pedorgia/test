<script setup>
  import { useLocalStorage } from '../composables/store';
  import FullCard from '../common/TODO/FullCard.vue';

  const { todoList } = useLocalStorage();
</script>

<template>
  <div class="modal">
    <FullCard
      :index="Number($route.params.id)"
      :item="todoList[$route.params.id]"
    />
  </div>
</template>

<style scoped lang="scss">
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

  .tasks {
    height: 30px;
  }

  .task-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .editMode {
    display: flex;
    justify-content: space-between;
  }

  button {
    margin: 5px;
    border: 2px;
    color: white;
    background-color: red;

    cursor: pointer;
    border-radius: 5px;
  }
  .changeTaskButtons {
    display: none;
  }

  .tasks :hover .changeTaskButtons {
    display: flex;
  }
</style>
