import App from "@/App";
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";

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

  it("should render correct contents", () => {
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
  });

  it("should set correct default data", () => {
    // vm is used to access the Vue instance
    expect(wrapper.vm.item).to.equal("");
    expect(wrapper.vm.items).to.deep.equal([]);
  });

  it('should have the "Add" button diabled', () => {
    const addItemButton = wrapper.find(".ui.button");
    expect(addItemButton.element.disabled).to.be.true;
  });

  describe("the user populates the text input field", () => {
    let inputField;
    // Vue asynchronously updates the DOM based on changes to data
    // test runners like Mocha run synchronously
    beforeEach(async () => {
      inputField = wrapper.find("input");
      inputField.element.value = "New Item";
      // the trigger() method simulates the user interaction
      // it accepts two arguments: the event to simulate, and an event object (optional)
      await inputField.trigger("input");
    });

    it('should update the "text" data property', () => {
      expect(wrapper.vm.item).to.equal("New Item");
    });

    it('should enable the "Add" button when text input is populated', () => {
      const addItemButton = wrapper.find(".ui.button");
      expect(addItemButton.element.disabled).to.be.false;
    });

    describe("and then clears the input", () => {
      it('should disable the "Add" button', async () => {
        const addItemButton = wrapper.find(".ui.button");
        inputField.element.value = "";
        await inputField.trigger("input");
        expect(addItemButton.element.disabled).to.be.true;
      });
    });
  });
});
