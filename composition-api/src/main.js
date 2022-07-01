import { createApp } from "vue";
import App from "./app/App.vue";
import store from "./app/store";

// provide/inject pattern relies on the parent component to provide data to any child component
// child components can access the provided value with the inject option
// the child component must be a direct descendant of the parent component
createApp(App)
  .provide("store", store)
  .mount("#app");
