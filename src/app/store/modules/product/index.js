import axios from "axios";

// the application level state is an entire list of product items
const state = {
  productItems: [],
};

// when the application loads in the browser, we'll make a call
// to the server to GET all items in server-product-data.json and update the state
// we need to mutate our productModule state to be equal to the state in the server
// this is how the client state stays in sync with the server state
// the first argument is the state, the second is the payload, the data we need to update our state
const mutations = {
  UPDATE_PRODUCT_ITEMS(state, payload) {
    state.productItems = payload;
  },
};
const actions = {
  // getProductItems allows ut to GET the products
  // we use a destructured syntax to pass the context.commit as an argument
  getProductItems({ commit }) {
    // to handle the async call to the server and retries the payload we use axios
    // axios is promise-based and allows to make XMLHttpRequests requests
    axios.get("/api/products").then((response) => {
      commit("UPDATE_PRODUCT_ITEMS", response.data);
    });
  },
};
// the only getter we need is a method that gets the list of product items in our state
const getters = {
  productItems: (state) => state.productItems,
};
const productModule = {
  state,
  mutations,
  actions,
  getters,
};

export default productModule;
