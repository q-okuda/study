<script setup>
const { data: blogs } = await useFetch('/api/blogList');
</script>
<template>
  <h1>TOP</h1>
  <article v-for="blog in blogs.contents" :key="blog.id">
    <nuxt-link :to="`/${blog.id}/`">
      <h2 class="title">{{ blog.title }}</h2>
      <figure>
        <img :src="blog.eyecatch.url" alt="">
      </figure>
    </nuxt-link>
  </article>
</template>
