const filterButtons = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.img-upload__effect-level');
sliderElement.classList.add('hidden');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentFilter = 'none';

const FILTER_OPTIONS = {
  'chrome': {min: 0, max: 1, step: 0.1, filterName: 'grayscale', measurement: ''},
  'sepia': {min: 0, max: 1, step: 0.1, filterName: 'sepia', measurement: ''},
  'marvin': {min: 0, max: 100, step: 1, filterName: 'invert', measurement: '%'},
  'phobos': {min: 0, max: 3, step: 0.1, filterName: 'blur', measurement: 'px'},
  'heat': {min: 1, max: 3, step: 0.1, filterName: 'brightness', measurement: ''}
};

const onChangeFilter = function (evt) {
  currentFilter = evt.target.value;
  if (currentFilter === 'none'){
    sliderElement.classList.add('hidden');
    imgUploadPreview.removeAttribute('style');
    effectLevelValue.value = '100';
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: FILTER_OPTIONS[currentFilter].min,
        max: FILTER_OPTIONS[currentFilter].max,
      },
      step: FILTER_OPTIONS[currentFilter].step,
      start: FILTER_OPTIONS[currentFilter].max
    });
    sliderElement.classList.remove('hidden');
    imgUploadPreview.style = `filter: ${FILTER_OPTIONS[currentFilter].filterName}(${FILTER_OPTIONS[currentFilter].max}${FILTER_OPTIONS[currentFilter].measurement})`;
  }
};

for (const filterButton of filterButtons) {
  filterButton.addEventListener('change', onChangeFilter);
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = Number(sliderElement.noUiSlider.get());
  if (currentFilter !== 'none') {
    imgUploadPreview.style = `filter: ${FILTER_OPTIONS[currentFilter].filterName}(${effectLevelValue.value}${FILTER_OPTIONS[currentFilter].measurement})`;
  }
});
