import contentful from "contentful";

const config = useRuntimeConfig();

const client = contentful.createClient({
  space: config.spaceId,
  accessToken: config.accessToken,
});

export default client;
