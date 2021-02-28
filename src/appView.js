import { handlePost, selectLng } from './appController.js';

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

const preview = (elem) => (e) => {
  const {
    id,
    title,
    description,
    link,
  } = elem;
  e.preventDefault();
  handlePost(id);
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
  const modalLink = modalDiv.querySelector('.full-article');
  modalLink.setAttribute('href', link);
  const closeButtons = modalDiv.querySelectorAll('button');
  closeButtons.forEach((button) => button.addEventListener('click', close));
};

const addPosts = (posts, i18next, IdReadedPosts) => {
  const div = document.querySelector('.posts');
  div.innerHTML = `<h2 class="posts-text">${i18next.t('texts.post')}</h2>`;
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'list-group');
  posts.forEach((item) => {
    const { id, title, link } = item;
    const li = document.createElement('li');
    li.setAttribute('id', id);
    li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start');
    const a = document.createElement('a');
    if (IdReadedPosts.includes(id)) {
      a.setAttribute('class', 'font-weight-normal');
    } else {
      a.setAttribute('class', 'font-weight-bold');
    }
    a.setAttribute('href', link);
    a.setAttribute('rel', 'noopener noreferrer');
    a.setAttribute('target', '_blank');
    a.innerHTML = title;
    a.addEventListener('click', () => {
      handlePost(id);
    });
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

const addFeed = (feed, i18next) => {
  const div = document.querySelector('.feeds');
  div.innerHTML = `<h2 class="feeds-text">${i18next.t('texts.feed')}</h2>`;
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

const buildHtml = (i18next) => {
  document.querySelectorAll('.flag-icon').forEach((item) => {
    item.addEventListener('click', selectLng(item.id));
  });
  const feeds = document.querySelector('.feeds-text');
  if (feeds) {
    feeds.innerHTML = i18next.t('texts.feed');
  }
  const posts = document.querySelector('.posts-text');
  if (posts) {
    posts.innerHTML = i18next.t('texts.post');
  }
  document.querySelector('h1').innerHTML = i18next.t('texts.h1');
  document.querySelector('.example').innerHTML = i18next.t('texts.example');
  document.querySelector('#add').innerHTML = i18next.t('texts.form.add');
  document.querySelector('#formInput').setAttribute('placeholder', i18next.t('texts.form.input'));

  document.querySelector('.full-article').innerHTML = i18next.t('texts.modal.fullArticle');
  document.querySelector('#close').innerHTML = i18next.t('texts.modal.close');
};

export { addFeed, addPosts, buildHtml };
