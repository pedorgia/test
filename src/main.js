import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BaseButton from "@/common/BaseButton.vue";
const app = createApp(App);

app.use(router);

app.component("v-button", BaseButton);

// app.directive("click-outside", {
//   bind(el, binding) {
//     el.addEventListener("click", (e) => e.stopPropagation());
//     document.body.addEventListener("click", binding.value);
//   },
//   unbind(el, binding) {
//     document.body.removeEventListener("click", binding.value);
//   },
// });

app.mount("#app");
