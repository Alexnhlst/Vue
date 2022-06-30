<!-- The Composition API can be explained as an API that exposes Vue's core capabilities as standalone functions -->
<template>
    <div>
        <h2>{{ getGreeting }}</h2>
        <p>This is the Hello World component.</p>
    </div>
</template>

<script>
export default {
    name: "MyComponent",
    // the setup() function is executed before a component is created and when the props of the component are available
    // it takes two arguments: props (data passed down from a parent component), context (an object that exposes three different component properties: attributes, slots and emit events)
    setup(props, context) {
        return {
            // this object's properties can be accessed in the component template
            getGreeting: "Hello World!"
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