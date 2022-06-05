// the field level information and peristed items makes the state objcet
const state = {
  fields: {
    newItem: "",
    email: "",
    urgency: "",
    termsAndConditions: false,
  },
  items: [],
};

// each mutation handler receives a payload of the data we'd want to update a particular property with
const mutations = {
  UPDATE_NEW_ITEM(state, payload) {
    state.fields.newItem = payload;
  },
  UPDATE_EMAIL(state, payload) {
    state.fields.email = payload;
  },
  UPDATE_URGENCY(state, payload) {
    state.fields.urgency = payload;
  },
  UPDATE_TERMS_AND_CONDITIONS(state, payload) {
    state.fields.termsAndConditions = payload;
  },
  // when a form is submittes, we'll also need a mutation that involves updating the items array
  // with the newly added item and another one that's responsible in clearing all the fields
  UPDATE_ITEMS(state, payload) {
    state.items = payload;
  },
  CLEAR_FIELDS() {
    state.fields.newItem = "";
    state.fields.email = "";
    state.fields.urgency = "";
    state.fields.termsAndConditions = false;
  },
};
const actions = {
  loadItems(context, payload) {
    return new Promise((resolve, reject) => {
      apiClient.loadItems().then(
        (items) => {
          context.commit("UPDATE_ITEMS", items);
          resolve(items);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  saveItems(context, payload) {
    return new Promise((resolve, reject) => {
      const items = payload;
      apiClient.saveItems(payload).then(
        () => {
          context.commit("UPDATE_ITEMS", items);
          context.commit("CLEAR_FIELDS");
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
const getters = {
  newItem: (state) => state.fields.newItem,
  newItemLength: (state) => state.fields.newItem.length,
  isNewItemInputLimitExceeded: (state) => state.fields.newItem.length >= 20,
  email: (state) => state.fields.email,
  urgency: (state) => state.fields.urgency,
  isNotUrgent: (state) => state.fields.urgency === "Nonessential",
  termsAndConditions: (state) => state.fields.termsAndConditions,
  items: (state) => state.items,
};

window.store = Vuex.createStore({
  state,
  mutations,
  actions,
  getters,
});

let apiClient = {
  loadItems: function () {
    return {
      then: function (cb) {
        setTimeout(() => {
          cb(JSON.parse(localStorage.items) || "[]");
        }, 1000);
      },
    };
  },
  saveItems: function (items) {
    const success = !!(this.count++ % 2);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!success) return reject({ success });
        localStorage.items = JSON.stringify(items);
        return resolve({ success });
      }, 1000);
    });
  },
  count: 1,
};
