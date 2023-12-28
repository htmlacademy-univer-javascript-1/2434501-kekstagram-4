import {sendData} from '../network-api.js';
import {showAlert} from '../utils.js';
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {});

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const AlertTextValues = {
  EMPTY: '',
  HASTAGS_REPEATED: 'Хэш-теги не должны повторяться!',
  HASTAGS_MORE_THAN_5: 'Хэш-тегов не должно быть больше 5!',
  HASHTAG_INVALID: 'Введен невалидный хэш-тег!',
  COMMENT_TOO_LONG: 'Комментарий слишком длинный!'
};

let alertText = AlertTextValues.EMPTY;


const validateHashtags = (value) => {
  alertText = AlertTextValues.EMPTY;
  if (value === ''){
    return true;
  }
  const hashtags = value.trimEnd().split(' ');
  const lowerHashtags = hashtags.map((str) => str.toLowerCase());
  const hashtagRule = /^#[a-zа-яё0-9]{1,19}$/i;
  let isHastagValid = true;
  const setOfHashtags = new Set(lowerHashtags);
  if (setOfHashtags.size !== lowerHashtags.length){
    alertText = AlertTextValues.HASTAGS_REPEATED;
    isHastagValid = false;
  } else {
    if (hashtags.length > 5) {
      alertText = AlertTextValues.HASTAGS_MORE_THAN_5;
      isHastagValid = false;
    } else {
      for (const element of lowerHashtags) {
        if (!hashtagRule.test(element)) {
          alertText = AlertTextValues.HASHTAG_INVALID;
          isHastagValid = false;
          break;
        }
      }
    }
  }
  return isHastagValid;
};

const validateDescription = (value) => {
  if (value.length >= 140) {
    alertText = AlertTextValues.COMMENT_TOO_LONG;
  }
  return value.length <= 140;
};

pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtags);
pristine.addValidator(uploadForm.querySelector('.text__description'), validateDescription);

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
