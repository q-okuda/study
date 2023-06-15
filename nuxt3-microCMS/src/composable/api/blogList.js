import client from './client';
// import { Blog } from '../../types/blog';

export default defineEventHandler(async (event) => {
  const data = await client.getList({
    endpoint: 'blogs',
  });
  return data;
});
