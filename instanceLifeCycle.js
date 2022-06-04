// Lifecycle hooks, within a Vue instance are named functions
// that occur throughout the lifecycle of the instance
// lifecycle refers to thte time an instance has been created, mounted, updated, and even destroyed
// Vue gives us the ability to create actions whenever a lifecycle hook has been run
const app = {
  data() {
    return {
      book: "FullStack Vue",
    };
  },
  // The created hook run when the instance has just been created
  // and the instance data and events are active, and when the instance can be accessed
  created() {
    alert("This book is " + this.book);
  },
  // The updated hook can be used to apply an action whenever there are any data
  // changes to a Vue instance causing it to re-render
};
