
((d, w) => {
  const client = contentful.createClient({
    space: '1rur9p7m6i0h',
    // environment: 'master', // defaults to 'master' if not set
    accessToken: 'EHGffb4ugbl3R-pURLN4ok1GFXPha5WcXnIRoQccY8k'
  });

  client.getEntries({
    content_type: 'blog',
  }).then((response) => {
    const articles = [].slice.call(response.items);
    articles.forEach(article => {
      const fields = article.fields;
      console.log(fields);
      const list = d.getElementById('js-list');

      const title = d.createElement('h4');
      title.innerHTML = fields.title;

      const item = d.createElement('li');
      item.appendChild(title);

      list.appendChild(item);
    });

  })
    .catch(console.error);

})(document, window);