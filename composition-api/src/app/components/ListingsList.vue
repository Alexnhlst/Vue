<template>
  <div id="listings">
    <Notification :notification="notification" :toggleNotification="toggleNotification" :isDark="isDark" />
    <div v-for="listing in listings" :key="listing.id">
      <ListingsListItem :listing="listing" :isDark="isDark" />
    </div>
    <button class="button is-light" :class="{ 'is-primary': isDark, 'is-info': !isDark }" @click="resetListings"
      :disabled="listings.length === 3">
      Reset
    </button>
  </div>
</template>

<script>
/* Original
import { mapActions } from 'vuex';
import ListingsListItem from './ListingsListItem';
import Notification from './Notification';

export default {
  name: 'ListingsList',
  props: ['listings', 'isDark'],
  data() {
    return {
      notification: null,
    }
  },
  methods: {
    ...mapActions([
      'resetListings'
    ])
  },
  components: {
    ListingsListItem,
    Notification
  },
  mounted() {
    this.notification = "Welcome to NewlineBnB!";

    setTimeout(() => {
      this.notification = null;
    }, 1000);
  }
}
*/
// Refactored
import { onMounted } from "vue"
import { useStore } from "vuex"
import ListingsListItem from './ListingsListItem.vue'
import Notification from './Notification.vue'
import useNotification from '../hooks/useNotification'
export default {
  name: "ListingsList",
  props: ["listings", "isDark"],
  setup() {
    // Accessing the store
    const store = useStore();
    // Reactive data properties
    const { notification, setNotification, toggleNotification } = useNotification()
    // Methods
    const resetListings = () => {
      setNotification("Listings have been reset!")
      return store.dispatch("resetListings")
    };
    // Mounted lifecycle hook
    onMounted(() => {
      setNotification("Welcome to NewlineBnB!")
    });
    // Returning properties for component to access
    return {
      notification,
      toggleNotification,
      resetListings
    }
  },
  components: {
    ListingsListItem,
    Notification
  }
}
</script>
