<script setup>
import router from "../../router/index";
import ItemInfo from "./ItemInfo.vue";

defineProps({
  index: Number,
  item: { tasks: { text: String, doneStatus: Boolean }, title: String },
});
</script>

<template>
  <div class="modal">
    <ItemInfo :item="item" />
    <div class="home-button">
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
  width: 400px;
  min-height: 130px;
  display: block;
  box-shadow: 0px 0px 10px 5px gainsboro;

  transform: translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  border-radius: 3px;
  padding: 1rem;

  .home-button {
    text-align: center;
  }
}

.modal button {
  margin: 5px;
  background-color: rgb(0, 0, 255, 0.6);
  text-align: center;
  border: none;
  color: white;
  padding: 3px;
  cursor: pointer;
  font-size: 13px;
  min-width: 55px;
  min-height: 25px;
  border-radius: 5px;
}
</style>
