import buildHTML from './buildHTML.js';
import watchedState from './appModal.js';
import { formValidator } from './appController.js';

export default () => {
  buildHTML(watchedState.i18next);

  const form = document.querySelector('form');
  form.addEventListener('submit', formValidator);
};
