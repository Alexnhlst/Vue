const ButtonRow = {
  template: `
     <div>
      <button @click="onButtonClick"
        name="button-hoodie"
        value="fullstack-hoodie"
        class="ui button">Hoodie</button>
      <button @click="onButtonClick"
        name="button-tee"
        value="fullstack-tee"
        class="ui button">Tee</button>
      <button @click="onButtonClick"
        name="button-fitted-cap"
        value="fullstack-fitted-cap"
        class="ui button">Fitted Cap</button>
      <button @click="onButtonClick"
        name="button-jacket"
        value="fullstack-jacket"
        class="ui button">Jacket</button>
    </div>
  `,
  // This function is an event handlers
  // event handling plays a central role to working with forms in JS applications
  // This function will be called when that event occurs, and will always receive an event object
  // evt.target references to the button that the user clicked
  methods: {
    onButtonClick(evt) {
      const button = evt.target;
      console.log(`The user clickd ${button.name}: ${button.value}`);
    },
  },
};

Vue.createApp({
  components: {
    "button-row": ButtonRow,
  },
}).mount("#app");
