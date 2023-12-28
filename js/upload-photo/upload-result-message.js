import { isEscapeKey } from '../utils.js';

const body = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onBodyClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
};

const onCloseButtonClick = () => {
  hideMessage();
};

function hideMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
  const closeButton = messageElement.querySelector('.success__button') || messageElement.querySelector('.error__button');
  closeButton.addEventListener('click', onCloseButtonClick);
}

const showUploadMessage = (messageElement, closeButtonClass) => {
  body.append(messageElement);
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onBodyClick);
  const closeButton = messageElement.querySelector(closeButtonClass);
  closeButton.addEventListener('click', onCloseButtonClick);
};

const showSuccessUploadMessage = () => {
  showUploadMessage(successMessageTemplate, '.success__button');
};

const showErrorUploadMessage = () => {
  showUploadMessage(errorMessageTemplate, '.error__button');
};


export {showSuccessUploadMessage, showErrorUploadMessage};
