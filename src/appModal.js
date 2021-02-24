import onChange from 'on-change';
import i18next from 'i18next';
import ru from '../locales/ru.js';
import { addFeed, addPosts } from './appView.js';

i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
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
    addFeed(newValue);
  }
  if (path === 'posts') {
    addPosts(newValue, state.i18next, state.IdReadedPosts);
  }
});
