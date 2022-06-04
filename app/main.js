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

// during the lifetime of the application we need to push a new note to the state notes array
// and push a new timestamp to the state timestamps array
// mutation are functions responsible to mutate the store state
// in Vuex, mutations need to be explicitly defined
// it consists of a string type and a handler
// in flux architectures, mutation string types are often declared in capital letters
// when the mutation is run, the first argument passed is the state
// mutations always have access to state as the first argument
// in addition, when an action calls a mutation, it may or may not pass a payload to a mutation
// the payload is an optional argument and, in some cases we can safely ignore it
// the ability to always have access to state arises from how a Vuex store is wired together
// the payload exists only when an action subsequently passes it to the mutation
const mutations = {
  ADD_NOTE(state, payload) {
    let newNote = payload;
    state.notes.push(newNote);
  },
  ADD_TIMESTAMP(state, payload) {
    let newTimeStamp = payload;
    state.timestamps.push(newTimeStamp);
  },
};

// Actions are functions that exist to call mutations
// they can perform asynchronous calls/logic handling before commiting to mutations
// actions receive an object as the first argument
// the context object allows to access the state with context.state, access getters with context.getters, and call/commit to mutations with context.commit
// an optional payload is passed as a second argument
// using context.commit to call the mutations, we can update our action object
const actions = {
  addNote(context, payload) {
    context.commit("ADD_NOTE", payload);
  },
  addTimestamp(context, payload) {
    context.commit("ADD_TIMESTAMP", payload);
  },
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
