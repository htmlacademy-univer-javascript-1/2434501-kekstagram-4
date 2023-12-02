import {getPublishedPhotos} from './data.js';
import { openBigPicture } from './render-big-picture.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;
const photosArray = getPublishedPhotos();
const thumbnailsListFragment = document.createDocumentFragment();


photosArray.forEach((element) => {
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
