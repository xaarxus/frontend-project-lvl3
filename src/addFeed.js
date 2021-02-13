import { uniqueId } from 'lodash';

export default (feed) => {
  const div = document.querySelector('.feeds');
  div.innerHTML = '<h2>Feeds</h2>';
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'list-group mb-5');
  feed.forEach((item) => {
    const { title, description } = item;
    const li = document.createElement('li');
    li.setAttribute('id', uniqueId());
    li.setAttribute('class', 'list-group-item');
    li.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    ul.append(li);
  });
  div.append(ul);
};
