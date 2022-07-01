<template>
  <div class="app" :class="{ 'has-background-black': darkMode }">
    <div class="container is-max-desktop py-6 px-4">
      <div v-if="loading">
        <progress class="progress is-small is-info" max="100">60%</progress>
      </div>
      <div v-if="!loading">
        <ListingsList :listings="listings" />
      </div>
      <button class="button is-small is-pulled-right my-4" @click="toggleDarkMode">
        {{ darkModeButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
/* Original
  import { mapGetters } from 'vuex';
import ListingsList from './components/ListingsList';

export default {
  name: 'App',
  data() {
    return {
      isDark: false,
    }
  },
  computed: {
    ...mapGetters([
      'listings',
      'loading'
    ]),
    darkModeButtonText() {
      return this.isDark ? 'Light Mode' : 'Dark Mode';
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
    }
  },
  created() {
    this.$store.dispatch('getListings');
  },
  components: {
    ListingsList
  }
}
*/
// Refactored
import { computed } from 'vue'
import { useStore } from "vuex";
import ListingsList from './components/ListingsList.vue';
import useDarkMode from './hooks/useDarkMode'

export default {
  name: "App",
  setup() {
    // Accessing the store
    const store = useStore()
    // Hook
    const { darkMode, toggleDarkMode } = useDarkMode()
    // Computed properties
    const darkModeButtonText = computed(() => {
      return darkMode.value ? "Light Mode" : "Dark Mode"
    });
    const listings = computed(() => store.getters.listings)
    const loading = computed(() => store.getters.loading)
    // Fire off actions for component created lifecycle stage
    store.dispatch("getListings")
    // Returning properties for component to access
    return {
      darkMode,
      darkModeButtonText,
      listings,
      loading,
      toggleDarkMode
    }
  },
  components: {
    ListingsList
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%
}
</style>

<style scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>