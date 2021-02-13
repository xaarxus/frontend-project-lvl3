const createID = () => {
  const id = { value: 0 };
  const { value } = id;
  id.value += 1;
  return value;
};

export default (data) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');
  const channel = xml.querySelector('channel');

  const feedTitle = channel.querySelector('title').innerHTML;
  const feedDescription = channel.querySelector('description').innerHTML;
  const newFeed = { id: createID(), title: feedTitle, description: feedDescription };

  const posts = channel.querySelectorAll('item');
  const newPosts = [];
  posts.forEach((item) => {
    const title = item.querySelector('title').innerHTML;
    const description = item.querySelector('description').innerHTML;
    const link = item.querySelector('link').innerHTML;
    newPosts.push({
      id: createID(),
      title,
      description,
      link,
    });
  });

  return { newFeed, newPosts };
};
