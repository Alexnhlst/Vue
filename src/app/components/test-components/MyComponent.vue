<!-- A singe-file component focus heavily on coupling logic -->
<!-- It consists of three parts: -->
<!-- <template> - contains the component's markup in plain HTML -->
<!-- <script> - exports the component object constructor that consists of all the JS logic -->
<!-- <style> - contains all the component styles -->
<template>
    <h2>{{ getGreeting }}</h2>
    <p>This is the Hello World component.</p>
</template>

<script>
export default {
    name: "MyComponent",
    data() {
        return {
            reversedGreeting: "!dlrow olleH",
        };
    },
    computed: {
        getGreeting() {
            return this.reversedGreeting.split("").reverse().join("")
        }
    }
};
</script>

<!-- scoped dictates these styles will be applied to this and only this component -->
<style lang="scss" scoped >
h2,
p {
    width: 100%;
    text-align: center;
}
</style>