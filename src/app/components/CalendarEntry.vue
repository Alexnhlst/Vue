<template>
    <div id="calendar-entry">
        <div class="calendar-entry-note">
            <!-- v-model is used for two-way data binding with form inputs -->
            <!-- it binds user input with a Vue object's data model (as one changes, the other gets updated) -->
            <input type="text" placeholder="New Event" v-model="inputEntry" required />
            <p class="calendar-entry-day">
                Day of event: <span class="bold">{{ titleOfActiveDay }}</span>
            </p>
            <a class="button is-primary is-small is-outlined" @click="submitEvent(inputEntry)">Submit</a>
        </div>
        <!-- v-if takes a data property as an expression and renders a particular -->
        <!-- code-block based on the truthiness of that data property -->
        <p style="color: red; font-size: 13px" v-if="error">You must type somthing first!</p>
    </div>
</template>

<script>
import { store } from '../store'
export default {
    name: "CalendarEntry",
    data() {
        return {
            // inputEntry needs to be specified in the component's data method
            // the initial value is blank so the user is first presented
            // with an empty field (it's two-way data binded)
            inputEntry: "",
            // the error property displays an error if the user clicks submit without typing anything
            // and prevents the action from calling the state mutation
            error: false,
        }
    },
    methods: {
        // submitEvent will call store.submiteEvent() and pass the user input
        // it then restore inputEntry to a blank string
        submitEvent(eventDetails) {
            if (eventDetails === "") return this.error = true;
            store.submitEvent(eventDetails);
            this.inputEntry = "";
            this.error = false;
        }
    },
    computed: {
        // method to retrieve the title of the day from the store's getActiveDay() method
        titleOfActiveDay() {
            return store.getActiveDay().fullTitle
        }
    }

}
</script>

<style lang="scss" scoped>
#calendar-entry {
    background: #fff;
    border: 1px solid #42b883;
    border-radius: 10px;
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;

    .calendar-entry-note {
        input {
            width: 200px;
            font-weight: 600;
            border: 0;
            border-bottom: 1px solid #ccc;
            font-size: 15px;
            height: 30px;
            margin-bottom: 10px;

            &:focus {
                outline: none;
            }
        }

        .calendar-entry-day {
            color: #42b883;
            font-size: 12px;
            margin-bottom: 10px;
            padding-bottom: 5px;

            .bold {
                font-weight: 600;
            }
        }

        .submit {
            display: block;
            margin: 0 auto;
        }
    }
}
</style>