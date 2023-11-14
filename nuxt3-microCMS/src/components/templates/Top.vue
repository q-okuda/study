<script setup>
const useCursorPosStore = useCursorPos();
// 分割代入で呼び出す場合、storeToRefsで呼び出さないとリアクティブ性が失われる
const { sumPos, x, y } = storeToRefs(useCursorPosStore);
const { changePos, $reset } = useCursorPosStore;
changePos();

// onMounted() コンポーネントがマウントされた後
// SSR時には呼び出されない
onMounted(() => {
  console.log('onMounted');
});

// onUnmounted() コンポーネントがアンマウントされた後
// SSR時には呼び出されない
onUnmounted(() => {
  console.log('onUnmounted');
});

// onBeforeMount() コンポーネントがマウントされる直前
// SSR時には呼び出されない
onBeforeMount(() => {
  console.log('onBeforeMount');
});

// クッキー定義
const fooCookie = useCookie('foo-key');
// セット
fooCookie.value = 'bar-value';
// 取得
// fooCookie.value
// 削除
// fooCookie.value = null;
</script>
<template>
  <Header />
  <v-main>
    <v-container>
      <PageTitle>TOP</PageTitle>
      <ArticleList />
      <Counter />
      <CursorPos :x="x" :y="y" />
      <p>sum: {{ sumPos }}</p>
      <button type="button" @click="$reset">リセット</button>
    </v-container>
  </v-main>
  <Footer />
</template>

