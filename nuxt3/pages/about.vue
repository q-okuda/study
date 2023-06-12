<script>
export default {
  mounted() {
    this.$nextTick(()=>{
      console.log('about');
    })
  },
}
</script>
<template>
  <div id="about">
    <h1>About</h1>
  </div>
</template>