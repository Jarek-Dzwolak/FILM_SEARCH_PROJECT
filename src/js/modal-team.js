const open = document.querySelector('.footer__btn');
const close = document.querySelector('.team-modal__btn--close');
const modal = document.querySelector('[data-modal-team]');
const modals = document.querySelector('.team-modal');
const bcgdop = document.querySelector('.backdrop');

open.addEventListener('click', teamModal);
close.addEventListener('click', teamModal);
modal.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.code === 'Close') {
    closeModal();
  }
});

function teamModal() {
  modal.classList.toggle('visually-hidden');
  modals.classList.toggle('visually-hidden');
}

function closeModal() {
  modal.classList.add('visually-hidden');
  modals.classList.add('visually-hidden');
}
