const close = (e) => {
  e.preventDefault();
  const body = document.querySelector('body');
  body.removeAttribute('style');
  body.setAttribute('class', 'd-flex flex-colum min-vh-100');

  const modalDiv = document.querySelector('#modal');
  modalDiv.removeAttribute('aria-modal');
  modalDiv.removeAttribute('style');
  modalDiv.setAttribute('aria-hidden', 'true');
  modalDiv.setAttribute('class', 'modal fade');

  const div = document.querySelector('.modal-backdrop');
  div.parentNode.removeChild(div);
};

export default ({ title, description, link }) => (e) => {
  e.preventDefault();
  const body = document.querySelector('body');
  body.setAttribute('class', 'd-flex flex-column min-vh-100 modal-open');
  body.setAttribute('style', 'padding-right: 16px;');
  const div = document.createElement('div');
  div.setAttribute('class', 'modal-backdrop fade show');
  body.append(div);

  const modalDiv = document.querySelector('#modal');
  modalDiv.setAttribute('class', 'modal fade show');
  modalDiv.setAttribute('style', 'display: block; padding-right: 16px;');
  modalDiv.setAttribute('aria-modal', 'true');
  modalDiv.removeAttribute('aria-hidden');

  const modalTitle = modalDiv.querySelector('.modal-title');
  modalTitle.innerHTML = title;

  const modalBody = modalDiv.querySelector('.modal-body');
  modalBody.innerHTML = description;

  const modalLink = modalDiv.querySelector('a');
  modalLink.setAttribute('href', link);

  const closeButtons = modalDiv.querySelectorAll('button');
  closeButtons.forEach((button) => button.addEventListener('click', close));
};
