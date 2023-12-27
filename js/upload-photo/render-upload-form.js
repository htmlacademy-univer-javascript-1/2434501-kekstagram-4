import {isEscapeKey} from '../utils.js';
import './validate-form.js';
import './photo-scaling.js';
import './photo-filters.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelUploadButton = document.querySelector('.img-upload__cancel');


const closeUploadForm = function () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelUploadButton.removeEventListener('click', onCancelUpload);
};

const showUploadForm = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelUploadButton.addEventListener('click', onCancelUpload);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function onCancelUpload () {
  closeUploadForm();
}

imgUploadInput.addEventListener('change', showUploadForm);
