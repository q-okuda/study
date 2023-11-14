<script setup>
const { data, pending, error, refresh } = await useFetch(
  'https://jsonplaceholder.typicode.com/todos'
);

const config = useRuntimeConfig();
// console.log(config);
</script>
<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
