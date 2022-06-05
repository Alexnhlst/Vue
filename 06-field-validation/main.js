const InputForm = {
  // The @submit handler is called either by clicking the submit button or by pressing enter
  // the event handler is tied to the form, so the event object argument is less useful
  // v-model gets a refernce to the text field element value
  // it creates two data binding between inputs and a data property
  // if an error arises we'll need to display it
  // we'll do this up by showing a validation error message, if they exist
  // if the newItem field exceed the predefined length of characters, v-if will check if the computed property
  // is true and show an error message
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <label>New Item</label>
          <input v-model="fields.newItem" type="text" placeholder="Add an item!">
          <span style="float: right">{{ fields.newItem.length }}/20</span>
          <span style="color: red">{{ fieldErrors.newItem }}</span>
          <span v-if="isNewItemInputLimitExceeded"
            style="color: red; display: block">
            Must be under twenty characters
          </span>
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="fields.email" type="text" placeholder="What's your email?"/>
          <span style="color: red">{{fieldErrors.email}}</span>
        </div>

        <div class="field">
          <label>Urgency</label>
          <select v-model="fields.urgency" class="ui fluid search dropdown">
            <option disabled value="">Please select one</option>
            <option>Nonessential</option>
            <option>Moderate</option>
            <option>Urgent</option>
          </select>
          <span style="color: red">{{fieldErrors.urgency}}</span>
          <span v-if="isNotUrgent" style="color: red; display: block">
            Must be moderate to urgent
          </span>
        </div>

        <div class="field">
          <div class="ui checkbox">
            <input v-model="fields.termsAndConditions" type="checkbox"/>
            <label>I accept the terms and conditions</label>
            <span style="color: red">{{fieldErrors.termsAndConditions}}</span>
          </div>
        </div>

        <button class="ui button" :disabled="isNewItemInputLimitExceeded || isNotUrgent">Submit</button>
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
      // the fieldsErrors data object store validation errors if they exist
      fieldErrors: {
        newItem: undefined,
        email: undefined,
        urgency: undefined,
        termsAndConditions: undefined,
      },
      // an empty array will contain the data inputted by the user
      items: [],
    };
  },
  computed: {
    isNewItemInputLimitExceeded() {
      return this.fields.newItem.length >= 20;
    },
    isNotUrgent() {
      return this.fields.urgency === "Nonessential";
    },
  },
  methods: {
    // an user enters an item and click submit
    // the newItem data value, bound to the text input, is added to the items data array
    // the text field is cleared so that it is ready for more input
    // the component re-renders and displays the updated list of items
    // preventDefault() prevents the browser's default action of submitting the form
    submitForm(evt) {
      evt.preventDefault();
      // we call validateForm when the form is submitted
      // if the validation errors object has any keys we know there are issues
      // we return early to prevent the new information from being added to the list
      this.fieldErrors = this.validateForm(this.fields);
      if (Object.keys(this.fieldErrors).length) return;
      // if there are no errors, we add the new item information and clear the fields
      this.items.push(this.fields.newItem);
      this.fields.newItem = "";
      this.fields.email = "";
      this.fields.urgency = "";
      this.fields.termsAndConditions = false;
    },
    // validateForm makes sure that newItem, email, urgency, and termsAndConditions are present
    // it will return an empty object if there are no issues
    // if there are issuse, it will return an object with keys corresponding to each field name and values corresponding to each error message
    validateForm(fields) {
      const errors = {};
      if (!fields.newItem) errors.newItem = "New Item Required";
      if (!fields.email) errors.email = "Email Required";
      if (!fields.urgency) errors.urgency = "Urgency Required";
      if (!fields.termsAndConditions) {
        errors.termsAndConditions = "Terms and conditions have to be approved";
      }
      // another validation is executed on the email field
      // calling the helper isEmail helper function
      // a regex check is executed
      if (fields.email && !this.isEmail(fields.email)) {
        errors.email = "Invalid Email";
      }
      return errors;
    },
    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
  },
};

Vue.createApp({
  components: {
    "input-form": InputForm,
  },
}).mount("#app");
