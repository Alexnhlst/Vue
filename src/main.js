import { createApp } from "vue";
import App from "./app";
import { router } from "./app";

createApp(App).use(router).mount("#app");
