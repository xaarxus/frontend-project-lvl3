import preview from './eventListeners.js';

export default (posts) => {
  const div = document.querySelector('.posts');
  div.innerHTML = '<h2>Posts</h2>';
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'list-group');
  posts.forEach((item) => {
    const { id, title, link } = item;
    const li = document.createElement('li');
    li.setAttribute('id', id);
    li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start');
    const a = document.createElement('a');
    a.setAttribute('class', 'font-weight-bold');
    a.setAttribute('href', link);
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('target', '_blank');
    a.innerHTML = title;

    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-primary btn-sm');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.innerHTML = 'Preview';

    button.addEventListener('click', preview(item));

    li.append(a, button);
    ul.append(li);
  });
  div.append(ul);
};
