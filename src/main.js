// Importing createApp
import { createApp } from "vue";
// Importing the main app
// import App from "./app/App.vue";
// Importing a single-file component
// import MyComponent from "./app/MyComponent.vue";
// Importing components wich share a store
import NumberDisplay from "./app/NumberDisplay.vue";
import NumberSubmit from "./app/NumberSubmit.vue";

// Creating the app
createApp(NumberDisplay).mount("#app");
createApp(NumberSubmit).mount("#app2");
