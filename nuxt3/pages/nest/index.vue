<script>
export default {
  mounted() {
    this.$nextTick(()=>{
      console.log('nest');
    })
  },
}
</script>
<template>
  <div id="nest">
    <h1>Nest index</h1>
  </div>
</template>