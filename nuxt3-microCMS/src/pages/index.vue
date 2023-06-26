<script setup>
const { data: blogs } = await useFetch('/api/blogList');
const { counter, inc, dec } = useCounter();
</script>
<template>
  <main>
    <h1 class="title">TOP</h1>
    <ul class="articleList">
      <li v-for="blog in blogs.contents" :key="blog.id" class="articleItem">
        <nuxt-link :to="`/${blog.id}/`" class="articleLink">
          <h2 class="articleTitle">{{ blog.title }}</h2>
          <figure class="articleThumbnail">
            <img :src="blog.eyecatch.url" alt="" />
          </figure>
        </nuxt-link>
      </li>
    </ul>
    <div>カウンター: {{ counter }}</div>
    <button @click="inc">+</button>
    <button @click="dec">-</button>
  </main>
</template>
<style lang="scss" scoped>
main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
}

.title {
  text-align: center;
}

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
