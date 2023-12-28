const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const getCurrentScale = () => {
  let scale = scaleControlValue.value;
  scale = scale.substring(0, scale.length - 1);
  scale = scale / 100;
  return scale;
};

const setNewScale = (scale) => {
  scale = `${scale * 100}%`;
  scaleControlValue.value = scale;
};

const resizePhoto = (scale) => {
  imgUploadPreview.style.scale = scale;
};

const decreasePhotoSize = () => {
  let scale = getCurrentScale();
  if (scale > 0.25){
    scale = scale - 0.25;
    resizePhoto(scale);
    setNewScale(scale);
  }
};

const increasePhotoSize = () => {
  let scale = getCurrentScale();
  if (scale <= 0.75){
    scale = scale + 0.25;
    resizePhoto(scale);
    setNewScale(scale);
  }
};

scaleControlSmaller.addEventListener('click', decreasePhotoSize);
scaleControlBigger.addEventListener('click', increasePhotoSize);
