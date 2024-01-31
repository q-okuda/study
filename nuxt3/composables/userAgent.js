import { UAParser } from 'ua-parser-js';

export const useUserAgent = () => {
  const { $userAgent } = useNuxtApp();
  const userAgent = useState('userAgent', () => $userAgent);
  const parser = new UAParser(userAgent.value);
  const result = parser.getResult();
  return {
    ...result
  };
};