<script setup>
const { counter, inc, dec } = useCounter();
</script>
<template>
    <div>カウンター: {{ counter }}</div>
    <button @click="inc">+</button>
    <button @click="dec">-</button>
</template>