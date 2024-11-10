const { createClient } = microcms;

((d, w) => {
  const client = createClient({
    serviceDomain: 'w39taarok5', // service-domain は XXXX.microcms.io の XXXX 部分
    apiKey: 'W0L712YHSxVFEAMLJFF53kTbt0qJxqXmScOb',
  });

  if(d.body.id == 'blogs') {
    client.get({ endpoint: 'blogs' }).then((res) => {
      const posts = res.contents;
      const postList = d.getElementById('js-postList');
      console.log(posts);
  
      posts.forEach(post => {
        const link = d.createElement('a');
        link.innerHTML = post.title;
        link.setAttribute('href', `article.html?id=${post.id}`);
  
        // const content = d.createElement('div');
        // content.innerHTML = post.content;
  
        if(post.eyecatch) {
          const eyeCatch = d.createElement('img');
          eyeCatch.setAttribute('src', `${post.eyecatch.url}`);
          eyeCatch.setAttribute('alt', '');
          link.appendChild(eyeCatch);
        }
  
        const item = d.createElement('li');
        item.appendChild(link);
        // item.appendChild(content);
  
        postList.appendChild(item);
      });
    });
  } else if (d.body.id == 'article') {
    // URLパラメータから記事IDを取得
    const urlParams = new URLSearchParams(w.location.search);
    const articleId = urlParams.get('id');

    // MicroCMSから記事データを取得し、HTMLに差し込むd
    client.get({ endpoint: `blogs/${articleId}` }).then((res) => {
      console.log(res);
      const article = res;
      d.getElementById('js-ttl').textContent = article.title;
      d.getElementById('js-contents').innerHTML = article.content;
    });
  }
})(document, window);