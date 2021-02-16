import * as yup from 'yup';
import axios from 'axios';
import onChange from 'on-change';
import addFeed from './addFeed.js';
import addPosts from './addPosts.js';
import parser from './parser.js';

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
    const formButtom = form.querySelector('button');
    const formInput = form.querySelector('input');
    formButtom.setAttribute('disabled', 'true');
    formInput.setAttribute('readonly', 'true');
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
          input.setAttribute('class', 'form-control form-control-lg w-100');
          input.value = '';
          axios.get(value, { timeout: 10000 })
            .then((respose) => {
              state.rssFlows = [...rssFlows, value];
              feedback.innerHTML = '<p class="text-success">RSS has been loaded</p>';
              const { newFeed, newPosts } = parser(respose.data);

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

              setInterval(() => {
                axios.get(value, { timeout: 10000 })
                  .then((res) => {
                    const updatePosts = parser(res.data).newPosts;
                    watchedState.posts = [...updatePosts, ...posts];
                  });
              }, 4000);
            })
            .catch(() => {
              input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
              feedback.innerHTML = '<p class="text-success text-danger">Network error</p>';
            });
        } else {
          input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
          feedback.innerHTML = '<p class="text-success text-danger">It\'s not valid RSS link</p>';
        }
      });
    formButtom.removeAttribute('disabled');
    formInput.removeAttribute('readonly');
  });
};
