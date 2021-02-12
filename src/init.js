import * as yup from 'yup';
import axios from 'axios';
import onChange from 'on-change';
import parser from './parser.js';
import addFeed from './addFeed.js';
import addPosts from './addPosts.js';

export default () => {
  const state = {
    value: '',
    rssFlows: [],
    feeds: [],
    posts: [],
  };

  const input = document.querySelector('input');
  input.addEventListener('input', (e) => {
    e.preventDefault();
    state.value = e.target.value;
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const schema = yup.object().shape({
      url: yup.string().url(),
    });
    schema.isValid({
      url: state.value,
    })
      .then((valid) => {
        const feedback = document.querySelector('.feedback');
        if (valid) {
          const { value, rssFlows } = state;
          if (rssFlows.includes(value)) {
            input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
            feedback.innerHTML = '<p class="text-success text-danger">Rss already exists</p>';
            return;
          }
          state.rssFlows = [...rssFlows, value];
          input.setAttribute('class', 'form-control form-control-lg w-100');
          input.value = '';
          feedback.innerHTML = '<p class="text-success">RSS has been loaded</p>';
          axios.get(value)
            .then((respose) => {
              const data = parser(respose.data);
              const { newFeed, newPosts } = data;

              const { feeds, posts } = state;

              const watchedState = onChange(state, (path, newValue) => {
                if (path === 'feeds') {
                  addFeed(newValue);
                }
                if (path === 'posts') {
                  addPosts(newValue);
                }
              });

              watchedState.feeds = [newFeed, ...feeds];
              watchedState.posts = [...newPosts, ...posts];
            });
        } else {
          input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
          feedback.innerHTML = '<p class="text-success text-danger">It\'s not valid RSS link</p>';
        }
      });
  });
};
