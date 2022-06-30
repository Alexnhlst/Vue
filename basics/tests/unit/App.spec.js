import App from "@/App";
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";

/*
In vue 2 it was simpler to test if a component is mounted
describe("App.vue", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();
    // CSS selectors were used to check the assertion
    expect(
      vm.$el.querySelector(".ui.selectable thead tr th").textContent
    ).to.contain("Items");
    expect(vm.$el.querySelector(".ui.button").textContent).to.contain("Add");
    expect(vm.$el.querySelector(".ui.label").textContent).to.contain(
      "Remove all"
    );
  });
});
*/

describe("App.vue", () => {
  // A wrapper is an object that contains a mounted component and the accompanying methods to help test the component
  // shallowMount() allows to mount a component without rendering its children
  let wrapper;
  // the wrapper is available in each of the it blocks
  // if one of the test needs to modify the shallow rendered component, at the start of the next spec the component's data would be unpredictable
  // it is preferable to re-render the shallow component between each spec using a beforeEach function
  beforeEach(() => {
    wrapper = shallowMount(App);
  });
  it(
    "should render correct contents",
    () => {
      // The html() helper method helps retrieve a component's HTML
      expect(wrapper.html()).to.contain("<th>Items</th>");
      expect(wrapper.html()).to.contain(
        '<input type="text" class="prompt" placeholder="Add item...">'
      );
      expect(wrapper.html()).to.contain(
        '<button type="submit" class="ui button" disabled="">Add</button>'
      );
      expect(wrapper.html()).to.contain(
        '<span class="ui label">Remove all</span>'
      );
    },
    it("should set correct default data", () => {
      // vm is used to access the Vue instance
      expect(wrapper.vm.item).to.equal("");
      expect(wrapper.vm.items).to.deep.equal([]);
    })
  );
});
