import {sendData} from '../network-api.js';
import {showAlert} from '../utils.js';
const uploadForm = document.querySelector('.img-upload__form');

let alertText = '';

const pristine = new Pristine(uploadForm, {

});

const validateHashtags = function (value) {
  alertText = '';
  if (value === ''){
    return true;
  }
  const hashtags = value.trimEnd().split(' ');
  const lowerHashtags = hashtags.map((str) => str.toLowerCase());
  const hashtagRule = /^#[a-zа-яё0-9]{1,19}$/i;
  let isHastagValid = true;
  const setOfHashtags = new Set(lowerHashtags);
  if (setOfHashtags.size !== lowerHashtags.length){
    alertText = 'Хэш-теги не должны повторяться!';
    isHastagValid = false;
  } else {
    if (hashtags.length > 5) {
      alertText = 'Хэш-тегов не должно быть больше 5!';
      isHastagValid = false;
    } else {
      for (const element of lowerHashtags) {
        if (!hashtagRule.test(element)) {
          alertText = 'Введен невалидный хэш-тег!';
          isHastagValid = false;
          break;
        }
      }
    }
  }
  return isHastagValid;
};

const validateDescription = function (value) {
  if (value.length >= 140) {
    alertText = 'Комментарий слишком длинный!';
  }
  return value.length <= 140;
};

pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtags);
pristine.addValidator(uploadForm.querySelector('.text__description'), validateDescription);

const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUploadPhotoFormSubmit = (onSuccess, onFailure) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch((err) => {
          onFailure(err.message);
        })
        .finally(unblockSubmitButton);
    } else {
      showAlert(alertText);
    }

  });
};


export {setUploadPhotoFormSubmit};
