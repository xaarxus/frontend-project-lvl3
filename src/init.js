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
    console.log(state.value);
  });
};
