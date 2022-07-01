<!-- The Composition API can be explained as an API that exposes Vue's core capabilities as standalone functions -->
<template>
    <div>
        <h2>{{ getGreeting }}</h2>
        <p>This is the Hello World component.</p>
    </div>
</template>

<script>
// ref() needs to be imported from vue
import { ref } from 'vue'
export default {
    name: "MyComponent",
    // the setup() function is executed before a component is created and when the props of the component are available
    // it takes two arguments: props (data passed down from a parent component), context (an object that exposes three different component properties: attributes, slots and emit events)
    setup() {
        // Vue allows to handle state/data in a reactive manner
        // instead of using data() we can use the ref() function
        // it takes a single primitive value and retursn a reactive/mutable object
        // when the ref object is returned in the setup() function, the value of the ref can be accessed directly in the template
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
</script>

<style lang="scss" scoped>
h2 {
    width: 100%;
    text-align: center;
}
</style>