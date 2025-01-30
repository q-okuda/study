// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/sass/style.scss'],
  ssr: true, // SSRを有効化（Nuxt 3ではSSGにも必要）
  nitro: {
    prerender: {
      routes: [
        '/', // ホームページ
        '/about', // 静的な固定ページ
        '/blog/1', // 動的ルートの例
        '/blog/2', // 他の動的ルート
      ],
    },
  },
});