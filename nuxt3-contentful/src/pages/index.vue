<script setup>
const { data: blogs } = await useFetch('/api/blogList');
</script>
<template>
  <h1>TOP</h1>
  <ul>
    <li v-for="(blog, i) in blogs" :key="i">
      <nuxt-link :to="`/${blog.sys.id}/`">
        <h2 class="title">{{ blog.fields.title }}</h2>
        <figure class="eyecatch" v-if="blog.fields.eyecatch">
          <img
            :src="blog.fields.eyecatch.fields.file.url"
            :alt="blog.fields.eyecatch.fields.title"
          />
        </figure>
      </nuxt-link>
    </li>
  </ul>
</template>
