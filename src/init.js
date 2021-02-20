import * as yup from 'yup';
import axios from 'axios';
import onChange from 'on-change';
import i18next from 'i18next';

import { addFeed, addPosts } from './addContent.js';
import parser from './parser.js';
import buildHTML from './buildHTML.js';
import ru from '../locales/ru.js';

export default () => {
  const state = {
    timeoutID: null,
    value: '',
    rssFlows: [],
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, (path, newValue) => {
    if (path === 'feeds') {
      addFeed(newValue);
    }
    if (path === 'posts') {
      addPosts(newValue, i18next);
    }
  });

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const getNewPosts = () => {
    const { posts, rssFlows } = state;
    const promises = rssFlows.map(((link) => fetch(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(link)}`)
      .then((res) => axios.get(res.url)
        .then((respose) => parser(respose.data.contents)))
    ));
    Promise.all(promises)
      .then((response) => response.map((item) => item.newPosts))
      .then((data) => {
        const allTitlePosts = posts.map((item) => item.title);
        const responsePosts = data.flat();
        const newAllPosts = responsePosts.filter((item) => !allTitlePosts.includes(item.title));
        watchedState.posts = [...newAllPosts, ...posts];
      });

    clearTimeout(state.timeoutID);
    state.timeoutID = setTimeout(getNewPosts, 5000);
  };

  buildHTML(i18next);

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
            feedback.innerHTML = `<p class="text-success text-danger">${i18next.t('feedback.exists')}</p>`;
            return;
          }
          input.setAttribute('class', 'form-control form-control-lg w-100');
          input.value = '';
          fetch(`https://hexlet-allorigins.herokuapp.com/rew?url=${encodeURIComponent(value)}`)
            .then((res) => {
              axios.get(res.url, { timeout: 10000 })
                .then((respose) => {
                  feedback.innerHTML = `<p class="text-success">${i18next.t('feedback.success')}</p>`;
                  const { newFeed, newPosts } = parser(respose.data.contents);

                  const { feeds, posts } = state;

                  watchedState.feeds = [newFeed, ...feeds];
                  watchedState.posts = [...newPosts, ...posts];

                  state.rssFlows = [...rssFlows, value];

                  clearTimeout(state.timeoutID);
                  state.timeoutID = setTimeout(getNewPosts, 5000);
                })
                .catch(() => {
                  input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
                  feedback.innerHTML = `<p class="text-success text-danger">${i18next.t('feedback.networkError')}</p>`;
                });
            });
        } else {
          input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
          feedback.innerHTML = `<p class="text-success text-danger">${i18next.t('feedback.validUrl')}</p>`;
        }
      });
    formButtom.removeAttribute('disabled');
    formInput.removeAttribute('readonly');
  });
};
