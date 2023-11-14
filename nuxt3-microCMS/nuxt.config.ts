import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  srcDir: 'src/',
  // グローバルで適用するスタイル
  css: [
    '@/assets/sass/_reset.scss',
    '@/assets/sass/_core.scss',
    '@/assets/sass/_util.scss',
    '@/assets/sass/libs/_vuetify.scss',
  ],
  // コンポーネント読み込み設定
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
  // コンポーザブル読み込み設定
  imports: {
    dirs: [
      'composables/**', // ネスト関係なくすべて自動インポート
    ]
  },
  build: {
    transpile: ['vuetify'],
  },
  // hooks: {
  //   'vite:extendConfig': (config) => {
  //     config.plugins!.push(vuetify());
  //   },
  // },
  // piniaのよく使う関数を自動インポート
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs',
    ]
  },
  vite: {
    css: {
      preprocessorOptions: {
        // 変数、mixinをvueファイル内で使用できるように
        scss: {
          additionalData: `
          @import "@/assets/sass/variables/_common"; 
          @import "@/assets/sass/variables/_fontfamily"; 
          @import "@/assets/sass/variables/_skin";
          @import "@/assets/sass/mixins/_common"; 
          @import "@/assets/sass/mixins/_responsive";
          `,
        },
      },
    },
  },
  runtimeConfig: {
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY,
  },
});

// nuxt3 x vuetify
// https://zenn.dev/coedo/articles/nuxt3-vuetify3
