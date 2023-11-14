<script setup>
defineProps({
  title: String,
});
</script>
<template>
  <Header />
  <main>
    <PageTitle>{{ title }}</PageTitle>
  </main>
  <Footer />
</template>