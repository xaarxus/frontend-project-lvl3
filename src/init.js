import watchedState from './appModal.js';
import { formValidator } from './appController.js';
import { buildHtml } from './appView';

export default () => {
  buildHtml(watchedState.i18next);

  const form = document.querySelector('form');
  form.addEventListener('submit', formValidator);
};
