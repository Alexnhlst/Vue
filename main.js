// Creating a submission component
// A component is intended to be a self-contained module
// we can grow markup, logic and even styles within it
const submissionComponent = {
  // Vue components are Vue instances. the majority of properties that exists
  // in a root application instance can exist in a component as well
  // 1. In Vue 3, the template of a component doesn't have to be enclosed within a single root element
  // 2. the submission object is currentyle undefined. when the component is declared, we're going have to pass data from the parent component using props
  // 3. the upvote() method needs to be mapped to a method wwithin the component
  template: `<div style="display: flex; width: 100%">
    <figure class="media-left">
      <img class="image is-64x64"
        v-bind:src="submission.submissionImage">
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>
            <a v-bind:href="submission.url" class="has-text-info">
              {{ submission.title }}
            </a>
            <span class="tag is-small">#{{ submission.id }}</span>
          </strong>
          <br>
            {{ submission.description }}
          <br>
          <small class="is-size-7">
            Submitted by:
            <img class="image is-24x24"
              v-bind:src="submission.avatar">
          </small>
        </p>
      </div>
    </div>
    <div class="media-right">
      <span class="icon is-small" v-on:click="upvote(submission.id)">
        <i class="fa fa-chevron-up"></i>
        <strong class="has-text-info">{{ submission.votes }}</strong>
      </span>
    </div>
  </div>`,
  // adding props
  props: ["submission", "submissions"],
  // migrated the method from the application instance
  methods: {
    upvote(submissionId) {
      const submission = this.submissions.find(
        (submission) => submission.id === submissionId
      );
      submission.votes++;
    },
  },
};

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
  components: {
    "submission-component": submissionComponent,
  },
};

// createApp() takes an options object as its first parameter
// which specify the options and initial condition of the Vue app
// .mount() is chained to specify the mounting point of the application

Vue.createApp(upvoteApp).mount("#app");
