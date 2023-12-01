import {getPublishedPhotos} from './data.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
const photosArray = getPublishedPhotos();
const thumbnailsListFragment = document.createDocumentFragment();


photosArray.forEach((element) => {
  const url = element.url;
  const description = element.description;
  const likesNumber = element.likes;
  const commentsNumber = element.comments.length;

  const newThumbnail = thumbnailTemplate.cloneNode(true);
  newThumbnail.querySelector('.picture__img').src = url;
  newThumbnail.querySelector('.picture__img').alt = description;
  newThumbnail.querySelector('.picture__likes').textContent = likesNumber;
  newThumbnail.querySelector('.picture__comments').textContent = commentsNumber;

  thumbnailsListFragment.appendChild(newThumbnail);
});

thumbnailsContainer.appendChild(thumbnailsListFragment);
