import axios from "axios";

const state = {
  cartItems: [],
};
// even though different action may have different purposes, their subsequent
// mutation will essentially do the same thing: update the carItems state
// keeping the client and the server in sync
const mutations = {
  UPDATE_CART_ITEMS(state, payload) {
    state.cartItems = payload;
  },
};
const actions = {
  // the first action GETs the data from /api/cart and then commit UPDATE_CART_ITEMS
  getCartItems({ commit }) {
    axios.get("/api/cart").then((response) => {
      commit("UPDATE_CART_ITEMS", response.data);
    });
  },
  // two POST calls are made to add or remove a new item from /api/cart
  // both of them needs a cartItem object payload
  addCartItem({ commit }, cartItem) {
    axios.post("/api/cart", cartItem).then((response) => {
      commit("UPDATE_CART_ITEMS", response.data);
    });
  },
  removeCartItem({ commit }, cartItem) {
    axios.post("/api/cart/delete", cartItem).then((response) => {
      commit("UPDATE_CART_ITEMS", response.data);
    });
  },
  // one final POST call is made to remove all items from the cart
  // it doesn't need a payload
  removeAllCartItems({ commit }) {
    axios.post("?api/cart/delete/all").then((response) => {
      commit("UPDATE_CART_ITEMS", response.data);
    });
  },
};
const getters = {
  // the first getter gets the list of cart items in our state
  cartItems: (state) => state.cartItems,
  // the second getter retrieves the total price of all items in the cart
  // reduce will create the sum
  cartTotal: (state) => {
    return state.cartItems
      .reduce((acc, cartItem) => {
        return cartItem.quantity * cartItem.price + acc;
      }, 0)
      .toFixed(2);
  },
  // the third getter retrieves the total quantity of items in the cart
  cartQuantity: (state) => {
    return state.cartItems.reduce((acc, cartItem) => {
      return cartItem.quantity + acc;
    }, 0);
  },
};
const cartModule = {
  state,
  mutations,
  actions,
  getters,
};

export default cartModule;
