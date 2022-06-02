// Creating the application instance
const upvoteApp = {
  // the data function returns data that needs to be handled within the view
  data() {
    return {
      submissions: Seed.submissions,
    };
  },
};

// createApp() takes an options object as its first parameter
// which specify the options and initial condition of the Vue app
// .mount() is chained to specify the mounting point of the application
Vue.createApp(upvoteApp).mount("#app");
