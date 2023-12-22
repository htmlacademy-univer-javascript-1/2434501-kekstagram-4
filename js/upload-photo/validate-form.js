const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {

});

const validateHashtags = function (value) {
  if (value === ''){
    return true;
  }
  const hashtags = value.trimEnd().split(' ');
  const lowerHashtags = hashtags.map((str) => str.toLowerCase());
  const hashtagRule = /^#[a-zа-яё0-9]{1,19}$/i;
  let isHastagValid = true;
  const setOfHashtags = new Set(lowerHashtags);
  if (setOfHashtags.size !== lowerHashtags.length){
    isHastagValid = false;
  } else {
    if (hashtags.length > 5) {
      isHastagValid = false;
    } else {
      for (const element of lowerHashtags) {
        if (!hashtagRule.test(element)) {
          isHastagValid = false;
          break;
        }
      }
    }
  }
  return isHastagValid;
};

const validateDescription = function (value) {
  return value.length <= 140;
};

pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtags);
pristine.addValidator(uploadForm.querySelector('.text__description'), validateDescription);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    uploadForm.submit();
  }
});


