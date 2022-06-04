// Importing createStore
import { createStore } from "vuex";
import product from "./modules/product";
import cart from "./modules/product";

// Modules are used to separate an application store into more manageable fragments
// the states of the modules can be independently access
// actions, mutations, and getters are registered to the global namespace by default
// if the same getter method name exists in two modules, Vuex would not know which module it's referring to
// Vuex allows us to namespace modules by specifying a namespaced property to true
export default createStore({
  modules: {
    product,
    cart,
  },
});
