// the reactive() method is used to make the state reactive
import { reactive } from "vue";
import { seedData } from "./seed";

export const store = {
  state: {
    data: reactive(seedData),
  },
  // All actions that mutate state should always be contained within the store
  // getActiveDay() return the day object that has active: true
  getActiveDay() {
    return this.state.data.find((day) => day.active);
  },
  // setActiveDay() sets the selected day to active: true and the other to false
  setActiveDay(dayId) {
    this.state.data.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  // The submitEvent() method gets the active day from getActiveDay
  // it then pushes new event details and set the edit property to false
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ details: eventDetails, edit: false });
  },
};
