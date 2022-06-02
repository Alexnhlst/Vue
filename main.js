// Creating the application instance
const upvoteApp = {
  // the data function returns data that needs to be handled within the view
  data() {
    return {
      submissions: Seed.submissions,
    };
  },
  // computed properties are used to handle complex calculations of information
  // that need to be displayed in the view. sortedSubmissions() returns a sorted array
  computed: {
    sortedSubmissions() {
      return this.submissions.sort((a, b) => {
        return b.votes - a.votes;
      });
    },
  },
  // methods, the upvote method is called by v-on
  // state within Vue is reactive
  methods: {
    upvote(submissionId) {
      const submission = this.submissions.find(
        (submission) => submission.id === submissionId
      );
      submission.votes++;
    },
  },
};

// createApp() takes an options object as its first parameter
// which specify the options and initial condition of the Vue app
// .mount() is chained to specify the mounting point of the application
Vue.createApp(upvoteApp).mount("#app");
