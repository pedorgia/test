<script setup>
  import ItemInfo from './ItemInfo.vue';

  const props = defineProps({
    index: Number,
    item: { tasks: { text: String, doneStatus: Boolean }, title: String },
  });

  const emit = defineEmits([
    'handleEditItem',
    'handleDeleteItem',
    'handleExpand',
  ]);

  const itemCopy = JSON.parse(JSON.stringify(props.item));
  itemCopy.tasks = itemCopy.tasks?.slice(0, 3);
</script>

<template>
  <div @click="emit('handleExpand', index)" class="open-details">
    <ItemInfo :index="index" :item="itemCopy" />
    <div v-show="item?.tasks?.length > 3" style="margin-bottom: 20px">...</div>
  </div>
  <div class="button-footer">
    <div class="todo-buttons">
      <v-button class="edit" @onClick="emit('handleEditItem', index)"
        >Edit me</v-button
      >
      <v-button class="delete" @onClick="emit('handleDeleteItem', index)"
        >Delete me</v-button
      >
    </div>
  </div>
</template>

<style scoped>
  .open-details {
    cursor: pointer;
    height: 70%;
  }
  .todo-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .delete {
    background-color: coral;
    color: white;
    width: 40%;
    cursor: pointer;
  }
  .edit {
    background-color: coral;
    color: white;
    width: 40%;
    cursor: pointer;
  }
  .button-footer {
    position: absolute;
    bottom: 20px;
    left: 5px;
  }
</style>
