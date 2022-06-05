const InputForm = {
  // The @submit handler is called either by clicking the submit button or by pressing enter
  // the event handler is tied to the form, so the event object argument is less useful
  // v-model gets a refernce to the text field element value
  // it creates two data binding between inputs and a data property
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <label>New Item</label>
          <input v-model="fields.newItem" type="text" placeholder="Add an item!">
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="fields.email" type="text" placeholder="What's your email?"/>
        </div>
        <div class="field">
          <label>Urgency</label>
          <select v-model="fields.urgency" class="ui fluid search dropdown">
            <option disabled value="">Please select one</option>
            <option>Nonessential</option>
            <option>Moderate</option>
            <option>Urgent</option>
          </select>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="fields.termsAndConditions" type="checkbox"/>
            <label>I accept the terms and conditions</label>
          </div>
        </div>
        <button class="ui button">Submit</button>
      </form>
      <div class="ui segment">
        <h4 class="ui header">Items</h4>
        <ul>
          <li v-for="item in items" class="item">{{item}}</li>
        </ul>
      </div>
    </div>`,
  data() {
    return {
      // the fields object can store data for as many inputs as we'd like
      fields: {
        newItem: "",
        email: "",
        urgency: "",
        termsAndConditions: false,
      },
      // an empty array will contain the data inputted by the user
      items: [],
    };
  },
  methods: {
    // an user enters an item and click submit
    // the newItem data value, bound to the text input, is added to the items data array
    // the text field is cleared so that it is ready for more input
    // the component re-renders and displays the updated list of items
    // preventDefault() prevents the browser's default action of submitting the form
    submitForm(evt) {
      this.items.push(this.fields.newItem);
      this.newItem = "";
      evt.preventDefault();
    },
  },
};

Vue.createApp({
  components: {
    "input-form": InputForm,
  },
}).mount("#app");
