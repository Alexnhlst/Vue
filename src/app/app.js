import mitt from "mitt";

const emitter = mitt();

// popstate is fired each time the active history entry changes
// re-rendering the app correctly
window.addEventListener("popstate", () => {
  emitter.emit("navigate");
});

const DunkirkBlurb = {
  name: "dunkirk-blurb",
  template: `<div>
    <h2>Dunkirk</h2>
    <p class="movies__description">Miraculous evacuation of Allied soldiers from
      Belgium, Britain, Canada, and France, who were cut off and surrounded by
      the German army from the beaches and harbor of Dunkirk, France, during the
      Battle of France in World War II.</p>
  </div>`,
};

const InterstellarBlurb = {
  name: "interstellar-blurb",
  template: `<div>
    <h2>Interstellar</h2>
    <p class="movies__description">Interstellar chronicles the adventures of a
      group of explorers who make use of a newly discovered wormhole to surpass
      the limitations on human space travel and conquer the vast distances
      involved in an interstellar voyage.</p>
  </div>`,
};

const TheDarkKnightRisesBlurb = {
  name: "the-dark-knight-rises-blurb",
  template: `<div>
    <h2>The Dark Knight Rises</h2>
    <p class="movies__description">Batman encounters the mysterious Selina Kyle
      and the villainous Bane, a new terrorist leader who overwhelms Gotham's
      finest. The Dark Knight resurfaces to protect a city that has branded him
      an enemy.</p>
  </div>`,
};

const routes = [
  {
    path: "/",
    component: {
      name: "index-blurb",
      template: `<h2>Pick a Cristopher Nolan movie!</h2>`,
    },
  },
  { path: "/dunkirk", component: DunkirkBlurb },
  { path: "/interstellar", component: InterstellarBlurb },
  { path: "/the-dark-knight-rises", component: TheDarkKnightRisesBlurb },
];

// View needs to be built as a mounting point for Dynamic components
// they constitute the ability to dinamically change between components based on a data attribute
// this can be achieved by binding an is attribute to the reserved <component> element
const View = {
  name: "router-view",
  template: `<component :is="currentView"></component>`,
  data() {
    return {
      currentView: {},
    };
  },
  created() {
    if (this.getRouteObject() === undefined) {
      this.currentView = {
        template: `<h2>Not Found :(. Pick a movie from the list!</h2>`,
      };
    } else {
      this.currentView = this.getRouteObject().component;
    }
    // the event listener/tirgger will be invoked when the browser's location changes
    emitter.on("navigate", () => {
      this.currentView = this.getRouteObject().component;
    });
  },
  methods: {
    getRouteObject() {
      // window.location is a sepcial object containing the properties of the browser's current location
      // pathname is the path of the URL
      return routes.find((route) => route.path === window.location.pathname);
    },
  },
};

const Link = {
  name: "router-link",
  // prop validation
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  // when a user clicks a traditional <a> tag, the browser uses href to determinte the next location to visit
  // href is bound to the value of the to prop
  template: `<a @click="navigate" :href="to">{{to}}</a>`,
  methods: {
    navigate(evt) {
      evt.preventDefault();
      // pushing the new location onto the browser's history stack
      // history.pushState() takes three arguments:
      // a state object to pass serialized state information
      // a title
      // the target URL
      window.history.pushState(null, null, this.to);
      // whent router-link is updating the location of the browser, our Vue app is not alerted of the change
      // an event bus triggers the app to re-render whenever the location changes
      emitter.emit("navigate");
    },
  },
};

const App = {
  name: "App",
  // the to attribute (props) has a value of the target location
  template: `
    <div id="app">
      <div class="movies">
        <h2>Which movie?</h2>
        <router-link to="/dunkirk">/dunkirk</router-link>
        <router-link to="/interstellar">/interstellar</router-link>
        <router-link to="/the-dark-knight-rises">/the-dark-knight-rises</router-link>
        <router-view></router-view>
      </div>
    </div>`,
  components: {
    "router-view": View,
    "router-link": Link,
  },
};

export default App;
