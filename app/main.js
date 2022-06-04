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

// Getters are to an application store what computed properties are to a component
// they are used to derive computed information from store state. we can call getters
// multiple times in our actions and in our components
// getters aren't required to work with with Vuex since information
// from store state can be directly obtained
// however, if this functionality is required in multiple places and to avoid
// repetition, getters can be used to streamline this everywhere
// getters receive state as theri first argument
const getters = {
  getNotes: (state) => state.notes,
  getTimestamps: (state) => state.timestamps,
  getNoteCount: (state) => state.notes.length,
};

// The Vuex library provides a function for creating a store
// this function requires state and mutations objects
const store = Vuex.createStore({
  state,
  mutations,
  actions,
  getters,
});

const inputComponent = {
  template: `<input
    placeholder="Enter a note"
    v-model="input"
    @keyup.enter="monitorEnterKey"
    class="input is-small" type="text"/>`,
  data() {
    return {
      input: "",
    };
  },
  methods: {
    // store actions are dispatched with store.dispatch("nameOfAction", payload)
    // to reference the injected store object, we use this.$store
    monitorEnterKey() {
      this.$store.dispatch("addNote", this.input);
      this.$store.dispatch("addTimestamp", new Date().toLocaleString());
      this.input = "";
    },
  },
};

const noteCountComponent = {
  template: `<div class="note-count">
      Note count: <strong>{{noteCount}}</strong>
    </div>`,
  computed: {
    noteCount() {
      return this.$store.getters.getNoteCount;
    },
  },
};

// to inject the store to the app within all components, we need to pass the store
// object to the application's instance
// the chained .use() method alllow to install a Vue plugin and pass the store object
const app = Vue.createApp({
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    timestamps() {
      return this.$store.getters.getTimestamps;
    },
  },
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent,
  },
});

app.use(store);
app.mount("#app");
