const filterButtons = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.img-upload__effect-level');
const imgUploadPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');

const FilterOptions = {
  'chrome': {min: 0, max: 1, step: 0.1, filterName: 'grayscale', measurement: ''},
  'sepia': {min: 0, max: 1, step: 0.1, filterName: 'sepia', measurement: ''},
  'marvin': {min: 0, max: 100, step: 1, filterName: 'invert', measurement: '%'},
  'phobos': {min: 0, max: 3, step: 0.1, filterName: 'blur', measurement: 'px'},
  'heat': {min: 1, max: 3, step: 0.1, filterName: 'brightness', measurement: ''}
};

const DEFAULT_EFFECT_MAX_VALUE = 100;
const DEFAULT_EFFECT_MIN_VALUE = 100;
const DEFAULT_STEP = 1;

let currentFilter = 'none';

sliderElement.classList.add('hidden');

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: FilterOptions[currentFilter].min,
      max: FilterOptions[currentFilter].max,
    },
    step: FilterOptions[currentFilter].step,
    start: FilterOptions[currentFilter].max
  });
  sliderElement.classList.remove('hidden');
  imgUploadPreview.style = `filter: ${FilterOptions[currentFilter].filterName}(${FilterOptions[currentFilter].max}${FilterOptions[currentFilter].measurement})`;
};

const resetFilter = () => {
  document.querySelector('#effect-none').click();
};

const onChangeFilter = (evt) => {
  currentFilter = evt.target.value;
  if (currentFilter === 'none'){
    sliderElement.classList.add('hidden');
    imgUploadPreview.removeAttribute('style');
    effectLevelValue.value = DEFAULT_EFFECT_MAX_VALUE;
  } else {
    updateSlider();
  }
};

for (const filterButton of filterButtons) {
  filterButton.addEventListener('change', onChangeFilter);
}

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT_MIN_VALUE,
    max: DEFAULT_EFFECT_MAX_VALUE,
  },
  start: DEFAULT_EFFECT_MAX_VALUE,
  step: DEFAULT_STEP,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = Number(sliderElement.noUiSlider.get());
  if (currentFilter !== 'none') {
    imgUploadPreview.style = `filter: ${FilterOptions[currentFilter].filterName}(${effectLevelValue.value}${FilterOptions[currentFilter].measurement})`;
  }
});

export {resetFilter};
