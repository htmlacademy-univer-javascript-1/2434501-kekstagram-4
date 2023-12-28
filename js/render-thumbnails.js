import {openBigPicture} from './render-big-picture.js';
import { getShuffledArray } from './utils.js';
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
const thumbnailsListFragment = document.createDocumentFragment();

const thumbnailsFilters = document.querySelector('.img-filters');
const thumbnailsFilterDefault = document.querySelector('#filter-default');
const thumbnailsFilterRandom = document.querySelector('#filter-random');
const thumbnailsFilterDiscussed = document.querySelector('#filter-discussed');


// const onFilterDefaultClick = function () {
//   thumbnailsFilterDefault.classList.add('img-filters__button--active');
//   thumbnailsFilterRandom.classList.remove('img-filters__button--active');
//   thumbnailsFilterDiscussed.classList.remove('img-filters__button--active');
// };

// const onFilterRandomClick = function () {
//   thumbnailsFilterRandom.classList.add('img-filters__button--active');
//   thumbnailsFilterDefault.classList.remove('img-filters__button--active');
//   thumbnailsFilterDiscussed.classList.remove('img-filters__button--active');
// };

// const onFilterDiscussedClick = function () {
//   thumbnailsFilterDiscussed.classList.add('img-filters__button--active');
//   thumbnailsFilterDefault.classList.remove('img-filters__button--active');
//   thumbnailsFilterRandom.classList.remove('img-filters__button--active');
// };

const compareComments = (postA, postB) => {
  const commentsCountA = postA.comments.length;
  const commentsCountB = postB.comments.length;

  return commentsCountB - commentsCountA;
};

const sortThumbnails = function (chosenFilter, thumbnailsArray) {
  if (chosenFilter === 'filter-discussed'){
    return thumbnailsArray.slice().sort(compareComments);
  } else if (chosenFilter === 'filter-random') {
    return getShuffledArray(thumbnailsArray.slice()).slice(0, 10);
  }
  return thumbnailsArray;
};

const renderThumbnails = (thumbnailsArray) => {
  if (thumbnailsContainer.contains(document.querySelector('.picture'))) {
    while (thumbnailsContainer.contains(document.querySelector('.picture'))) {
      thumbnailsContainer.removeChild(document.querySelector('.picture'));
    }
  }
  const chosenFilter = document.querySelector('.img-filters__button--active').id;
  const sortedArray = sortThumbnails(chosenFilter, thumbnailsArray);
  sortedArray.forEach((element) => {
    const url = element.url;
    const description = element.description;
    const likesNumber = element.likes;
    const commentsNumber = element.comments.length;
    const comments = element.comments;

    const newThumbnail = thumbnailTemplate.cloneNode(true);
    newThumbnail.querySelector('.picture__img').src = url;
    newThumbnail.querySelector('.picture__img').alt = description;
    newThumbnail.querySelector('.picture__likes').textContent = likesNumber;
    newThumbnail.querySelector('.picture__comments').textContent = commentsNumber;

    thumbnailsListFragment.appendChild(newThumbnail);

    const lastAddedThumbnail = thumbnailsListFragment.querySelector('.picture:last-child');

    lastAddedThumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(url, description, likesNumber, commentsNumber, comments);
    });
  });
  thumbnailsContainer.appendChild(thumbnailsListFragment);

  thumbnailsFilters.classList.remove('img-filters--inactive');
};

const filterDefaultClick = (cb) => {
  thumbnailsFilterDefault.addEventListener('click', (evt) => {
    thumbnailsFilterDefault.classList.add('img-filters__button--active');
    thumbnailsFilterRandom.classList.remove('img-filters__button--active');
    thumbnailsFilterDiscussed.classList.remove('img-filters__button--active');
    cb();
  });
};

const filterRandomClick = (cb) => {
  thumbnailsFilterRandom.addEventListener('click', (evt) => {
    thumbnailsFilterRandom.classList.add('img-filters__button--active');
    thumbnailsFilterDefault.classList.remove('img-filters__button--active');
    thumbnailsFilterDiscussed.classList.remove('img-filters__button--active');
    cb();
  });
};

const filterDiscussedClick = (cb) => {
  thumbnailsFilterDiscussed.addEventListener('click', (evt) => {
    thumbnailsFilterDiscussed.classList.add('img-filters__button--active');
    thumbnailsFilterDefault.classList.remove('img-filters__button--active');
    thumbnailsFilterRandom.classList.remove('img-filters__button--active');
    cb();
  });
};

export {renderThumbnails, filterDefaultClick, filterRandomClick, filterDiscussedClick};
