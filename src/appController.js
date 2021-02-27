import * as yup from 'yup';
import axios from 'axios';
import watchedState from './appModal.js';
import parser from './parser.js';

const selectLng = (message) => () => {
  switch (message) {
    case 'gb':
      watchedState.i18next.lng = 'gb';
      break;
    default:
      watchedState.i18next.lng = 'ru';
  }
};

const getNewPosts = () => {
  const { posts, rssFlows } = watchedState;
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

  clearTimeout(watchedState.timeoutID);
  watchedState.timeoutID = setTimeout(getNewPosts, 5000);
};

const changeInput = (e) => {
  e.preventDefault();
  watchedState.value = e.target.value;
};

const formValidator = (e) => {
  e.preventDefault();
  const form = document.querySelector('form');

  const input = document.querySelector('input');
  input.addEventListener('input', changeInput);

  const formButtom = form.querySelector('button');
  const formInput = form.querySelector('input');
  formButtom.setAttribute('disabled', 'true');
  formInput.setAttribute('readonly', 'true');
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  schema.isValid({
    url: watchedState.value,
  })
    .then((valid) => {
      const feedback = document.querySelector('.feedback');
      if (valid) {
        const { value, rssFlows } = watchedState;
        if (rssFlows.includes(value)) {
          input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
          feedback.innerHTML = `<p class="text-success text-danger">${watchedState.i18next.t('feedback.exists')}</p>`;
          return;
        }
        input.setAttribute('class', 'form-control form-control-lg w-100');
        input.value = '';
        fetch(`https://hexlet-allorigins.herokuapp.com/rew?url=${encodeURIComponent(value)}`)
          .then((res) => {
            axios.get(res.url, { timeout: 10000 })
              .then((respose) => {
                feedback.innerHTML = `<p class="text-success">${watchedState.i18next.t('feedback.success')}</p>`;
                const { newFeed, newPosts } = parser(respose.data.contents);

                const { feeds, posts } = watchedState;

                watchedState.feeds = [newFeed, ...feeds];
                watchedState.posts = [...newPosts, ...posts];

                watchedState.rssFlows = [...rssFlows, value];

                clearTimeout(watchedState.timeoutID);
                watchedState.timeoutID = setTimeout(getNewPosts, 5000);
              })
              .catch(() => {
                input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
                feedback.innerHTML = `<p class="text-success text-danger">${watchedState.i18next.t('feedback.networkError')}</p>`;
              });
          });
      } else {
        input.setAttribute('class', 'border border-danger form-control form-control-lg w-100');
        feedback.innerHTML = `<p class="text-success text-danger">${watchedState.i18next.t('feedback.validUrl')}</p>`;
      }
    });
  formButtom.removeAttribute('disabled');
  formInput.removeAttribute('readonly');
};

const handlePost = (id) => {
  const { IdReadedPosts } = watchedState;
  watchedState.IdReadedPosts = [...IdReadedPosts, id];
  const liElem = document.getElementById(id);
  const a = liElem.querySelector('a');
  a.setAttribute('class', 'font-weight-normal');
};

export { handlePost, formValidator, selectLng };
