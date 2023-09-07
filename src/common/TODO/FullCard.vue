<script setup>
  import router from '../../router/index';
  import ItemInfo from './ItemInfo.vue';

  defineProps({
    index: Number,
    item: { tasks: { text: String, doneStatus: Boolean }, title: String },
  });
</script>

<template>
  <div class="modal">
    <ItemInfo :item="item" />
    <div>
      <v-button @onClick="router.push({ name: 'home' })"
        >Go back to main page</v-button
      >
    </div>
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

  .modal button {
    margin: 5px;
    border: 2px;
    color: white;
    background-color: red;

    cursor: pointer;
    border-radius: 5px;
  }
</style>
