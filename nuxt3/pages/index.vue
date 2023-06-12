<script setup>
  const pageId = 'top';
  const count = ref(0);
  const increment = () => {
    count.value++;
    console.log(count.value);
  };

  logPageId(pageId);

  import axios from 'axios';
  async function asyncData() {
    const { data } = await axios.get(
      'https://w39taarok5.microcms.io/api/v1/blogs',
      {
        headers: { 'X-MICROCMS-API-KEY': 'W0L712YHSxVFEAMLJFF53kTbt0qJxqXmScOb' }
      }
    )
    return data
  }

  const contents = ref(asyncData());
  console.log(contents.value);
</script>
<template>
  <div :id="pageId">
    <h1>Top</h1>
    <img src="@/assets/images/img1.webp" alt="" style="width: 300px" />
    <NuxtLink to="./about">About</NuxtLink>
    <NuxtLink to="./nest">Nest</NuxtLink>
    <NuxtLink to="./nest/article2">Article2</NuxtLink>
    <NuxtLink to="./nest/article2">Article2</NuxtLink>
    <button
      type="button"
      style="width: 100px; height: 30px; border: 1px solid #000"
      @click="increment"
    >
      {{ count }}
    </button>

    <ul>
      <li v-for="content in contents" :key="content.id">
        <NuxtLink :to="`/${content.id}`">
          {{ content.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>


