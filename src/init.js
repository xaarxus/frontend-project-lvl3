import * as yup from 'yup';
import axios from 'axios';

export default () => {
  const state = {
    value: '',
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
          feedback.innerHTML = '<p class="text-success">RSS has been loaded</p>';
          axios.get(state.value)
            .then((respose) => console.log(respose.data));
        } else {
          feedback.innerHTML = '<p class="text-success text-danger">It\'s not valid RSS link</p>';
        }
      });
  });
};
