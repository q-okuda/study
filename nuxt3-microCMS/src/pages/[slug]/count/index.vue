<script setup>
import { storeToRefs } from 'pinia';
const counterStore = useCounterStore();
const { increment, decrement } = counterStore;
const { count } = storeToRefs(counterStore);
</script>
<template>
    <div>カウンター: {{ count }}</div>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
</template>