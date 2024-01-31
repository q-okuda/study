import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const context = nuxtApp.ssrContext;
  const userAgent: string = context?.req?.headers['user-agent'] ?? '';

  return {
    provide: {
      userAgent
    }
  };
});