// Simple state management can be performed by creating a store pattern
// this pattern involves sharing a data store between components
// the store manages this state with its actions/mutations/etc. and simply passes the same data to multiple components
// state basically means data. state management often refers to the management of application level data
export const store = {
  state: {
    numbers: [1, 2, 3],
  },
  pushNewNumber(newNumberString) {
    this.state.numbers.push(Number(newNumberString));
  },
};
