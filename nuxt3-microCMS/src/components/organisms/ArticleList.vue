<script setup>
const { data: blogs } = await useFetch('/api/blogList');
</script>
<template>
  <ul class="articleList">
    <li v-for="blog in blogs.contents" :key="blog.id" class="articleItem">
      <NuxtLink :to="`/${blog.id}/`" class="articleLink">
        <h2 class="articleTitle">{{ blog.title }}</h2>
        <figure class="articleThumbnail">
          <img :src="blog.eyecatch.url" alt="" />
        </figure>
      </NuxtLink>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.articleList {
  margin-top: 36px;
}

.articleItem {
  text-align: center;
  &:not(:first-of-type) {
    margin-top: 24px;
  }
}

.articleLink {
  display: inline-flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
}

.articleTitle {
  margin-left: 24px;
}

.articleThumbnail {
  width: 150px;
}
</style>
