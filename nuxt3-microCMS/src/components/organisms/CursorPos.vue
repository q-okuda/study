<script setup>
const props = defineProps({ x: Number, y: Number });
</script>
<template>
  <div>
    <span>カーソル位置 {x:{{ props.x }}, y:{{ props.y }}}</span>
  </div>
</template>
