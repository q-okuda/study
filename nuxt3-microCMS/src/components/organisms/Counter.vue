<script setup>
const counterStore = useCounterStore();
const { increment, decrement } = counterStore;
const { count } = storeToRefs(counterStore);

// onUpdated() コンポーネントがリアクティブな状態変更によってDOMツリーを更新した後
// SSR時には呼び出されない
onUpdated(() => {
  console.log('onUpdated');
});

// onBeforeUpdate() コンポーネントがリアクティブな状態変更によりDOMツリーを更新しようとする直前
// SSR時には呼び出されない
onBeforeUpdate(() => {
  console.log('onBeforeUpdated');
});
</script>
<template>
  <div class="counterWrap">
    <p class="countTxt">カウント: {{ count }}</p>
    <CounterButton @click="increment">+</CounterButton>
    <CounterButton @click="decrement">-</CounterButton>
  </div>
</template>
