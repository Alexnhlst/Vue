<template>
  <div id="listings">
    <Notification :notification="notification" :isDark="isDark" />
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
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
import ListingsListItem from './ListingsListItem.vue'
import Notification from './Notification.vue'
export default {
  name: "ListingsList",
  props: ["listings", "isDark"],
  setup() {
    // Accessing the store
    const store = useStore();
    // Reactive data properties
    const notification = ref(null);
    // Methods
    const resetListings = () => store.dispatch("resetListings");
    // Mounted lifecycle hook
    onMounted(() => {
      notification.value = "Welcome to NewlineBnB!"
      setTimeout(() => {
        notification.value = null
      }, 1000);
    });
    // Returning properties for component to access
    return {
      notification,
      resetListings
    }
  },
  components: {
    ListingsListItem,
    Notification
  }
}
</script>
