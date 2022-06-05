const InputForm = {
  // we want the submit button to communicate the current save status
  // if no save request is in-flight, we want the button to be enabled if the field data is valid
  // if we are in the process of saving, we wwant the button to read "Saving" and to be disabled
  // the user will know that the app is busy, and since the button is disabled, they won't be able to submit duplicate save requests
  // if the save request completes successfully, we use the button text to communicate that
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

        <button v-if="saveStatus === 'SAVING'"
          disabled class="ui button">
          Saving...
        </button>
        <button v-if="saveStatus === 'SUCCESS'"
          :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">
          Saved! Submit another
        </button>
        <button v-if="saveStatus === 'ERROR'"
          :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">
          Save Failed - Retry?
        </button>
        <button v-if="saveStatus === 'READY'"
        :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">
          Submit
        </button>

      </form>
      <div class="ui segment">
        <h4 class="ui header">Items</h4>
        <ul>
          <div v-if="loading" class="ui active inline loader"></div>
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
      // loading and saveStatus keep track of the loading and saving status
      loading: false,
      saveStatus: "READY",
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
    // we prevent the browser's default action of submitting the form with preventDefault()
    // if the form has field errors, we return early to prevent apiClient from being called
    // if no field errors exist, we create a new array called items which contains the existing component items array and the new field.newItem value
    // we then use apiClient to begin persisting the new items array with apiClient.saveItems()
    // if apiClient is successful, we update the component data with our new items array, empty fields and saveStatus: "SUCCESS"
    // if apiClient is not successful, we leave everything as is but set saveStatus to "ERROR"
    submitForm(evt) {
      evt.preventDefault();
      this.fieldErrors = this.validateForm(this.fields);
      if (Object.keys(this.fieldErrors).length) return;
      const items = [...this.items, this.fields.newItem];
      this.saveStatus = "SAVING";
      apiClient
        .saveItems(items)
        .then(() => {
          this.items = items;
          this.fields.newItem = "";
          this.fields.email = "";
          this.fields.urgency = "";
          this.fields.termsAndConditions = false;
          this.saveStatus = "SUCCESS";
        })
        .catch((err) => {
          console.log(err);
          this.saveStatus = "ERROR";
        });
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
  // in the created() hook we'll use apiClient
  created() {
    this.loading = true;
    apiClient.loadItems().then((items) => {
      this.items = items;
      this.loading = false;
    });
  },
};

// when the component has just been created and is about to be added to the DOM,
// we'll want to request any previously saved data
// we use the created() hook, which is automatically called by Vue at the appropriate time
let apiClient = {
  loadItems: function () {
    return {
      then: function (cb) {
        setTimeout(() => {
          // localStorage API allows to read and write to a key-value store in the user's browser
          // it doesn't have expiry
          cb(JSON.parse(localStorage.items) || "[]");
        }, 1000);
      },
    };
  },
  saveItems: function (items) {
    const success = !!(this.count++ % 2);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success });
        localStorage.items = JSON.stringify(items);
        return resolve({ success });
      }, 1000);
    });
  },
  count: 1,
};

Vue.createApp({
  components: {
    "input-form": InputForm,
  },
}).mount("#app");
