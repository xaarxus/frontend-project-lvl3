import _ from 'lodash';

export default (data) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');
  const channel = xml.querySelector('channel');

  const feedTitle = channel.querySelector('title').innerHTML;
  const feedDescription = channel.querySelector('description').innerHTML;
  const newFeed = { id: _.uniqueId(), title: feedTitle, description: feedDescription };

  const posts = channel.querySelectorAll('item');
  const newPosts = [];
  posts.forEach((item) => {
    const title = item.querySelector('title').innerHTML;
    const description = item.querySelector('description').innerHTML;
    const link = item.querySelector('link').innerHTML;
    newPosts.push({
      id: _.uniqueId(),
      title,
      description,
      link,
    });
  });

  return { newFeed, newPosts };
};
