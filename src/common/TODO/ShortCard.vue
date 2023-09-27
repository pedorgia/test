<script setup>
import ItemInfo from "./ItemInfo.vue";
import { ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";

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
const isActionButtons = ref(false);
itemCopy.tasks = itemCopy.tasks?.slice(0, 3);

const clickOnDots = (event) => {
  event.stopPropagation();
  if (!isActionButtons.value) {
    isActionButtons.value = true;
  }
  //isActionButtons.value = !isActionButtons.value;
  console.log(isActionButtons.value);
};
const deleteTODO = (event) => {
  event.stopPropagation();
  isActionButtons.value = false;
  emit("handleDeleteItem", props.index);
};
const editTODO = (event) => {
  event.stopPropagation();
  isActionButtons.value = false;
  emit("handleEditItem", props.index);
};

const closeDots = () => {
  if (isActionButtons) {
    isActionButtons.value = false;
  }
};
</script>

<template>
  <div @click="emit('handleExpand', index)" class="open-details">
    <div class="circle"></div>
    <div class="item-info"><ItemInfo :item="itemCopy" /></div>
    <div class="dots" @click="clickOnDots">
      <div
        class="action-buttons-block"
        v-if="isActionButtons"
        v-on-click-outside="closeDots"
      >
        <button @click="editTODO">edit todo</button>
        <button @click="deleteTODO">delete todo</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.open-details {
  cursor: pointer;
  padding: 15px 15px 0 15px;
  display: flex;
  justify-content: space-between;
}

.dots {
  cursor: pointer;
}
.dots:before {
  position: relative;
  content: "\2807";
  font-size: 30px;
  color: #cccccc;
}

.action-buttons-block {
  height: 45px;
  width: 100px;
  border-radius: 12px;
  box-shadow: 0px 0px 10px 5px gainsboro;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;

  position: absolute;
  top: 55px;
  right: 10px;
  z-index: 3;
  button {
    background-color: white;
    width: 80%;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    font-size: 15px;
    padding: 2px;
  }
}
button:hover {
  background-color: #646fd4;
}
.circle {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  border: 1px solid #cccccc;
}
</style>
