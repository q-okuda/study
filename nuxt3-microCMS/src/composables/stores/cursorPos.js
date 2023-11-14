export const useCursorPos = defineStore('cursorPos', () => {
  // state
  const x = ref(0);
  const y = ref(0);

  // getters
  const sumPos = computed(() => x.value + y.value);

  // actions
  const changePos = () => {
    onMounted(() => {
      window.addEventListener('mousemove', (e) => {
        x.value = e.pageX;
        y.value = e.pageY;
      });
    });
  };

  const $reset = () => {
    x.value = 0;
    y.value = 0;
  };

  return { x, y, sumPos, changePos, $reset };
});