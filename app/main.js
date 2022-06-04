// The Vuex store is where the application data (state) is kept
// State can never be mutated directly and can only be modified by calling mutations
// Actions are often responsible in calling mutations an are themselves dispatched within components
// A Vuex store also allows to define getters

// Vuex's key ideas:
// - all of the application's data is in a single data structure called the state, which is held in the store
// - the apps reads the state from this store
// - the state is never mutated directly outside the store
// - the views dispatch actions that describe what happened
// - the actions commit to mutations
// - mutations directly mutate/change store state
// - when the state is mutated, relevant components/views are re-rendered

// Application level data is the data that needs to be shared between components
// notes and timestamps can be declared in the new state object
const state = {
  notes: [],
  timestamps: [],
};

const inputComponent = {
  template: `<input placeholder="Enter a note" class="input is-small" type="text"/>`,
};

const app = {
  components: {
    "input-component": inputComponent,
  },
};

Vue.createApp(app).mount("#app");
