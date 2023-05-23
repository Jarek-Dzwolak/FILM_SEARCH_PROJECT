// Tworzenie modala
const modalBackdrop = document.createElement('div');
modalBackdrop.id = 'modal-backdrop';
modalBackdrop.className = 'modal-backdrop';

const container = document.createElement('div');
container.className = 'container';

const modal = document.createElement('div');
modal.id = 'modal';
modal.className = 'modal';

const closeModalBtn = document.createElement('button');
closeModalBtn.id = 'close-modal-btn';
closeModalBtn.type = 'button';
closeModalBtn.className = 'modal__close';
closeModalBtn.textContent = 'X';

const modalImage = document.createElement('img');
modalImage.id = 'modal-image';
modalImage.src = '';
modalImage.alt = 'tytuł filmu';
modalImage.className = 'modal-image';

const modalText = document.createElement('div');
modalText.id = 'modal-text';
modalText.className = 'modal__text';
modalText.style.display = 'block';

const modalTitle = document.createElement('h3');
modalTitle.id = 'modal-title';
modalTitle.className = 'modal__title';

const modalInfo1 = createModalInfo('Vote / Votes', 'modal__info__category', 'modal__info__details');
const modalInfo2 = createModalInfo('Popularity', 'modal__info__category', 'modal__info__details');
const modalInfo3 = createModalInfo(
  'Original Title',
  'modal__info__category',
  'modal__info__details',
);
const modalInfo4 = createModalInfo('Genre', 'modal__info__category', 'modal__info__details');

const modalDescription = document.createElement('article');
modalDescription.className = 'modal__description';

const modalDescriptionHeading = document.createElement('p');
modalDescriptionHeading.id = 'modal-description__modal';
modalDescriptionHeading.textContent = 'ABOUT';

const modalDescriptionText = document.createElement('p');
modalDescriptionText.id = 'modal-decription';

const modalButtons = document.createElement('div');
modalButtons.className = 'modal-buttons';

const watchedBtn = document.createElement('button');
watchedBtn.id = 'watched-btn';
watchedBtn.className = 'button button--modal';
watchedBtn.textContent = 'ADD TO WATCHED';

const queueBtn = document.createElement('button');
queueBtn.id = 'queue-btn';
queueBtn.className = 'button button--modal';
queueBtn.textContent = 'ADD TO QUEUE';

// Dodawanie elementów do modalu
modal.appendChild(closeModalBtn);
modal.appendChild(modalImage);

modalText.appendChild(modalTitle);
modalText.appendChild(modalInfo1);
modalText.appendChild(modalInfo2);
modalText.appendChild(modalInfo3);
modalText.appendChild(modalInfo4);
modalText.appendChild(modalDescription);

modalDescription.appendChild(modalDescriptionHeading);
modalDescription.appendChild(modalDescriptionText);

modalButtons.appendChild(watchedBtn);
modalButtons.appendChild(queueBtn);

modalText.appendChild(modalButtons);

container.appendChild(modal);
modalBackdrop.appendChild(container);

// Dodawanie modalu do dokumentu
document.body.appendChild(modalBackdrop);

// Funkcja pomocnicza do tworzenia elementów dla informacji w modalu
function createModalInfo(category, categoryClass, detailsClass) {
  const modalInfo = document.createElement('div');
  modalInfo.className = 'modal__info';

  const categoryElement = document.createElement('p');
  categoryElement.className = categoryClass;
  categoryElement.textContent = category;

  const detailsElement = document.createElement('p');
  detailsElement.className = detailsClass;
}
