import watchedState from './appModal.js';
import { formValidator } from './appController.js';

export default () => {
  const { i18next } = watchedState;
  document.querySelector('h1').innerHTML = i18next.t('texts.h1');
  document.querySelector('.example').innerHTML = i18next.t('texts.example');
  document.querySelector('#add').innerHTML = i18next.t('texts.form.add');
  document.querySelector('#formInput').setAttribute('placeholder', i18next.t('texts.form.input'));

  document.querySelector('.full-article').innerHTML = i18next.t('texts.modal.fullArticle');
  document.querySelector('#close').innerHTML = i18next.t('texts.modal.close');

  const form = document.querySelector('form');
  form.addEventListener('submit', formValidator);
};
