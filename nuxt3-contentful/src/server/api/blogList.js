import client from './client';

export default defineEventHandler(async (event) => {
  const data = await client.getEntries({
    content_type: process.env.CTF_BLOG_TYPE_ID,
  }).then((res) => { 
    return res.items;
  });
  return data;
});
