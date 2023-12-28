import {isEscapeKey} from '../utils.js';
import {setUploadPhotoFormSubmit} from './validate-form.js';
import './photo-scaling.js';
import './photo-filters.js';
import { resetFilter } from './photo-filters.js';
import {showErrorUploadMessage, showSuccessUploadMessage} from './upload-result-message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelUploadButton = document.querySelector('.img-upload__cancel');

const scaleValue = document.querySelector('.scale__control--value');
const textHastags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const resetFormInputs = function() {
  scaleValue.value = '100%';
  resetFilter();
  textHastags.value = '';
  textDescription.value = '';
  imgUploadInput.value = '';
};

const closeUploadForm = function () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFormInputs();
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelUploadButton.removeEventListener('click', onCancelUpload);
};

const reopenUploadForm = function () {
  imgUploadOverlay.classList.remove('hidden');
};

const closeUploadFormWithSuccess = function () {
  showSuccessUploadMessage();
};

const closeUploadFormWithFailure = function () {
  imgUploadOverlay.classList.add('hidden');
  showErrorUploadMessage();
};

const showUploadForm = function () {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
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

setUploadPhotoFormSubmit(closeUploadFormWithSuccess, closeUploadFormWithFailure);

imgUploadInput.addEventListener('change', showUploadForm);

export {closeUploadForm, reopenUploadForm};
