export const useCounter = () => {
  const counter = useState('counter', () => 0);
  const inc = counter => () => counter.value++;
  const dec = counter => () => counter.value--;
  return {
    counter: readonly(counter),
    dec: dec(counter),
    inc: inc(counter),
  };
};