<!-- The Composition API can be explained as an API that exposes Vue's core capabilities as standalone functions -->
<template>
    <div>
        <h2>{{ getGreeting }}</h2>
        <p>This is the Hello World component.</p>
    </div>
</template>

<script>
/* ref() needs to be imported from vue
import { ref } from 'vue'
export default {
    name: "MyComponent",
    the setup() function is executed before a component is created and when the props of the component are available
    it takes two arguments: props (data passed down from a parent component), context (an object that exposes three different component properties: attributes, slots and emit events)
    setup() {
        Vue allows to handle state/data in a reactive manner
        instead of using data() we can use the ref() function
        it takes a single primitive value and retursn a reactive/mutable object
        when the ref object is returned in the setup() function, the value of the ref can be accessed directly in the template
        const getGreeting = ref("Hello World!")
        const updateGreeting = () => {
            return (getGreeting.value = "Welcome to the app!")
        }
        return {
            // this object's properties can be accessed in the component template
            getGreeting,
            updateGreeting
        }
    },
}
*/
// reactive() allows to establish reactivity for an object
// while ref() is intended to be used to create reactivity of a single primitive value
// reactive() is intended to be used to create reactivity of a js object
// the object created in a reactive() function cannot be destructured or spread
// to use a reactive() function and destructure or spread the values we could use the toRefs() function
import { reactive, toRefs } from 'vue';
export default {
    name: "MyComponent",
    setup() {
        const greeting = reactive({
            message: "Hello World!",
            description: "Welcome to the app!",
        });
        const greetingRefs = toRefs(greeting);
        const { message, description } = greetingRefs;
        // with reactive() is possible to directly update the properties in the object without having to access a .value property
        const updateGreeting = () => {
            greeting.message = "Hello Hello!";
            greeting.description = "Welocome Welcome!";
        };
        return {
            greeting,
            updateGreeting,
            ...greetingRefs,
        }
    }
}

</script>

<style lang="scss" scoped>
h2 {
    width: 100%;
    text-align: center;
}
</style>