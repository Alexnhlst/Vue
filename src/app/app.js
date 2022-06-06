// importing createRouter and createWebHistory
import { createRouter, createWebHistory } from "vue-router";

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
  // to add the not found template with vue-router we use a custom param regular expresion
  // the regexp is specified inside parentheses right ater the param
  {
    path: "/:patchMatch(.*)*",
    component: {
      name: "not-found-blurb",
      template: `<h2>Not Found :(. Pick a movie from the list!</h2>`,
    },
  },
];

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
};

// hash mode URLs always contain a hash symbol after the hostname
// the benefit to this often lies with allowing us to have multiple client side
// routes without having to provide the necessary server side fallbacks
// everything after the hash symbol is never sent to the server
// to remove hashes in our URLs, we'll specify the history mode property
export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default App;
