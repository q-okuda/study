<script setup>
const { counter, inc, dec } = useCounter();
const route = useRoute();
const slug = String(route.params.slug);


const { data: article } = await useFetch(`/api/blogDetail`, {
  params: { slug: slug },
});

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
</script>
<template>
  <main>
    <span>{{ article.publishedAt }}</span>
    <ul>
      <li v-for="(tag, i) in article.tag" :key="tag.id">{{ tag.tag }}</li>
    </ul>
    <h1>{{ article.title }}</h1>
    <div v-html="article.content" />
    <div>カウンター: {{ counter }}</div>
    <button @click="inc">+</button>
    <button @click="dec">-</button>

    <nuxt-link to="./count/">countページ</nuxt-link>
  </main>
</template>
