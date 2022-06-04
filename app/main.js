// Creating the Event Bus
// an event bus is a global property that is used to enable
// isolated components to subscribe and publish
// custom events between each other
const emitter = mitt();

const noteCountComponent = {
  template: `<div class="note-count">Note count: <strong>{{noteCount}}</strong></div>`,
  data() {
    return {
      noteCount: 0,
    };
  },
  created() {
    emitter.on("add-note", (event) => this.noteCount++);
  },
};

const inputComponent = {
  // Binding data values
  // Adding an event handler
  template: `<input 
      class="input is-small" type="text"
      :placeholder="placeholder"
      v-model="input"
      @keyup.enter="monitorEnterKey"/>`,
  props: ["placeholder"],
  data() {
    return {
      input: "",
    };
  },
  // With Vue 3 is recommended to always document the events emitted in a emits property
  // any events emitted by a component will be bound to the component's root node
  emits: ["add-note"],
  methods: {
    monitorEnterKey() {
      // Vue custom events are triggered using $emit while specifying the name of the custom event
      // $emit allows for a second optional argument that allows the caller to pass
      // arbitrary values along with the emitted event
      // monitorEnterKey's custome $emit event add-note receives a data object with two properties: the user input and the timestamp
      emitter.emit("add-note", {
        note: this.input,
        timestamp: new Date().toLocaleString(),
      });
      // Clearing the user input
      this.input = "";
    },
  },
};

const app = {
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent,
  },
  // Adding properties
  data() {
    return {
      notes: [],
      timestamps: [],
      placeholder: "Enter a note",
    };
  },
  methods: {
    // By ddefault with JS, the event object is automatically passed down as the first
    // argument without the need for us to declare it in the template
    addNote(event) {
      this.notes.push(event.note);
      this.timestamps.push(event.timestamp);
    },
  },
  // The created hook is triggered the moment a Vue component has been created
  // and the component data and events can be accessed
  created() {
    emitter.on("add-note", (event) => this.addNote(event));
  },
};

Vue.createApp(app).mount("#app");
