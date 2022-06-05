const InputForm = {
  // The @submit handler is called either by clicking the submit button or by pressing enter
  // the event handler is tied to the form, so the event object argument is less useful
  // Vue allows to use refs to easily access a DOM element in a component
  // When the @submit handler is called, we can access this.$refs.newItem
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <input ref="newItem" type="text" placeholder="Add an item!">
        </div>
        <button class="ui button">Submit</button>
      </form>
    </div>`,
};

Vue.createApp({
  components: {
    "input-form": InputForm,
  },
  methods: {
    // preventDefault() prevents the browser's default action of submitting the form
    submitForm(evt) {
      evt.preventDefault();
      console.log(this.$refs.newItem.value);
    },
  },
}).mount("#app");
