const { createClient } = microcms;

((d, w) => {
  const client = createClient({
    serviceDomain: 'w39taarok5', // service-domain は XXXX.microcms.io の XXXX 部分
    apiKey: 'W0L712YHSxVFEAMLJFF53kTbt0qJxqXmScOb',
  });

  client.get({ endpoint: 'blogs' }).then((res) => {
    const posts = res.contents;
    const postList = d.getElementById('js-postList');
    console.log(posts);

    posts.forEach(post => {
      const link = d.createElement('a');
      link.innerHTML = post.title;
      link.setAttribute('href', '#');

      const content = d.createElement('div');
      content.innerHTML = post.content;

      const eyeCatch = d.createElement('img');
      eyeCatch.setAttribute('src', `${post.eyecatch.url}`);
      eyeCatch.setAttribute('alt', '');
      link.appendChild(eyeCatch);

      const item = d.createElement('li');
      item.appendChild(link);
      item.appendChild(content);

      postList.appendChild(item);
    });
  });
})(document, window);