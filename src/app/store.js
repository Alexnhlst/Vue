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
  // the goal of editEvent is to allow the user to change the edit boolean of the intended event object
  // it uses two find(), one to filter state data, based on day.id
  // the other to filter the events array of the targeted day, based on event.details
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const dayObj = this.state.data.find((day) => day.id === dayId);
    const eventObj = dayObj.events.find(
      (event) => event.details === eventDetails
    );
    eventObj.edit = true;
  },
  // resetEditOfAllEvents() sets all events to the the non-edit state prior to toggling the targeted event
  resetEditOfAllEvents() {
    this.state.data.map((dayObj) => {
      dayObj.events.map((event) => {
        event.edit = false;
      });
    });
  },
};
