<script setup>
import ButtonCounter from './components/ButtonCounter.vue';
import BlogPost from './components/BlogPost.vue';
</script>
<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' },
      ],
      postFontSize: 1,
    };
  },
};
</script>

<template>
  <main>
    <h1>Here is a child component!</h1>
    <ButtonCounter />
    <ButtonCounter />
    <ButtonCounter />
    <div :style="{ fontSize: postFontSize + 'em' }">
      <BlogPost
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        @enlarge-text="postFontSize += 0.1"
      />
    </div>
  </main>
</template>

<style scoped></style>
