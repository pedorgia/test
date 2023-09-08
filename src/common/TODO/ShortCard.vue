<script setup>
import ItemInfo from "./ItemInfo.vue";

const props = defineProps({
  index: Number,
  item: { tasks: { text: String, doneStatus: Boolean }, title: String },
});

const emit = defineEmits([
  "handleEditItem",
  "handleDeleteItem",
  "handleExpand",
]);

const itemCopy = JSON.parse(JSON.stringify(props.item));
itemCopy.tasks = itemCopy.tasks?.slice(0, 3);
</script>

<template>
  <div @click="emit('handleExpand', index)" class="open-details">
    <ItemInfo :item="itemCopy" />
    <div v-show="item?.tasks?.length > 3" style="margin-bottom: 20px">...</div>
  </div>
  <div class="button-footer">
    <v-button class="edit" @onClick="emit('handleEditItem', index)"
      >Edit me</v-button
    >
    <v-button class="delete" @onClick="emit('handleDeleteItem', index)"
      >Delete me</v-button
    >
  </div>
</template>

<style scoped>
.open-details {
  cursor: pointer;
  padding: 15px 15px 0 15px;
}
.button-footer .edit,
.delete {
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 17px;
  border-radius: 10px;
}

.edit {
  background-color: rgb(0, 0, 255, 0.6);
}
.delete {
  background-color: rgb(255, 0, 0, 0.6);
}

.button-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-align: center;
  padding: 0 15px 15px 15px;
}
</style>
