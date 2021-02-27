import onChange from 'on-change';
import i18next from 'i18next';
import ru from '../locales/ru.js';
import gb from '../locales/gb.js';
import { addFeed, addPosts, buildHtml } from './appView.js';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
    gb,
  },
});

const state = {
  timeoutID: null,
  value: '',
  rssFlows: [],
  feeds: [],
  posts: [],
  IdReadedPosts: [],
  i18next,
};

export default onChange(state, (path, newValue) => {
  if (path === 'feeds') {
    addFeed(newValue, state.i18next);
  }
  if (path === 'posts') {
    addPosts(newValue, state.i18next, state.IdReadedPosts);
  }
  if (path === 'i18next.lng') {
    i18next.changeLanguage(newValue);
    buildHtml(i18next);
  }
});
