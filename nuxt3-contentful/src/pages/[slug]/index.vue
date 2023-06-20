<script setup>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const route = useRoute();
const slug = String(route.params.slug);

const toHtml = (obj) => {
  return documentToHtmlString(obj);
};

const { data: article } = await useFetch(`/api/blogDetail`, {
  params: { slug: slug },
});

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
</script>
<template>
  <main>
    <h1>{{ article.fields.title }}</h1>
    <p>{{ slug }}</p>
    <div
      class="details"
      v-if="article.fields.details"
      v-html="toHtml(article.fields.details)"
    />
  </main>
</template>
