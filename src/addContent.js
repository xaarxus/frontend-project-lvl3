const close = (e) => {
  e.preventDefault();
  const body = document.querySelector('body');
  body.removeAttribute('style');
  body.setAttribute('class', 'd-flex flex-colum min-vh-100');

  const modalDiv = document.querySelector('#modal');
  modalDiv.removeAttribute('aria-modal');
  modalDiv.removeAttribute('style');
  modalDiv.setAttribute('aria-hidden', 'true');
  modalDiv.setAttribute('class', 'modal fade');

  const div = document.querySelector('.modal-backdrop');
  div.parentNode.removeChild(div);
};

const preview = ({ title, description, link }) => (e) => {
  e.preventDefault();
  const body = document.querySelector('body');
  body.setAttribute('class', 'd-flex flex-column min-vh-100 modal-open');
  body.setAttribute('style', 'padding-right: 16px;');
  const div = document.createElement('div');
  div.setAttribute('class', 'modal-backdrop fade show');
  body.append(div);

  const modalDiv = document.querySelector('#modal');
  modalDiv.setAttribute('class', 'modal fade show');
  modalDiv.setAttribute('style', 'display: block; padding-right: 16px;');
  modalDiv.setAttribute('aria-modal', 'true');
  modalDiv.removeAttribute('aria-hidden');

  const modalTitle = modalDiv.querySelector('.modal-title');
  modalTitle.innerHTML = title;

  const modalBody = modalDiv.querySelector('.modal-body');
  modalBody.innerHTML = description;

  const modalLink = modalDiv.querySelector('a');
  modalLink.setAttribute('href', link);

  const closeButtons = modalDiv.querySelectorAll('button');
  closeButtons.forEach((button) => button.addEventListener('click', close));
};

const addPosts = (posts, i18next) => {
  const div = document.querySelector('.posts');
  div.innerHTML = '<h2>Посты</h2>';
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
    button.setAttribute('class', 'btn btn-primary btn-sm prewiev');
    button.setAttribute('type', 'button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.innerHTML = i18next.t('texts.modal.prewiev');

    button.addEventListener('click', preview(item));

    li.append(a, button);
    ul.append(li);
  });
  div.append(ul);
};

const addFeed = (feed) => {
  const div = document.querySelector('.feeds');
  div.innerHTML = '<h2>Фиды</h2>';
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'list-group mb-5');
  feed.forEach((item) => {
    const { id, title, description } = item;
    const li = document.createElement('li');
    li.setAttribute('id', id);
    li.setAttribute('class', 'list-group-item');
    li.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    ul.append(li);
  });
  div.append(ul);
};

export { addFeed, addPosts };