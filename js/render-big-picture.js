import {isEscapeKey} from './utils.js';

const MAX_COMMENTS_VISIBLE = 5;
let visibleCommentsCount = 0;

const bigPicture = document.querySelector('.big-picture');

const bigPictureElements = {
  img: bigPicture.querySelector('.big-picture__img').querySelector('img'),
  likes: bigPicture.querySelector('.likes-count'),
  commentsCount: bigPicture.querySelector('.visible-comments-count'),
  commentsTotalCount: bigPicture.querySelector('.comments-count'),
  commentsLoaderButton: bigPicture.querySelector('.comments-loader'),
  comments: bigPicture.querySelector('.social__comments'),
  caption: bigPicture.querySelector('.social__caption'),
  closeBigPictureButton: bigPicture.querySelector('.big-picture__cancel')
};


const commentTemplate = document.querySelector('#comment-template').content;

const onDocumentKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseBigPicture = function () {
  closeBigPicture();
};

const renderComments = function (commentsList) {
  bigPictureElements.comments.textContent = '';
  for (let i = 0; i < commentsList.length; i++) {
    if (i === visibleCommentsCount) {
      break;
    }
    const element = commentsList[i];
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    bigPictureElements.comments.appendChild(comment);
  }
};

const loadMoreComments = function (commentsList) {
  if (visibleCommentsCount + MAX_COMMENTS_VISIBLE > commentsList.length) {
    bigPictureElements.commentsCount.textContent = commentsList.length;
    visibleCommentsCount = commentsList.length;
    bigPictureElements.commentsLoaderButton.classList.add('hidden');
  } else {
    visibleCommentsCount += MAX_COMMENTS_VISIBLE;
    bigPictureElements.commentsCount.textContent = visibleCommentsCount;
  }
  renderComments(commentsList, visibleCommentsCount);
};

let onLoadMoreComments = function() {};

const openBigPicture = function (url, description, likesNumber, commentsNumber, commentsList) {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureElements.img.src = url;
  bigPictureElements.caption.textContent = description;
  bigPictureElements.likes.textContent = likesNumber;
  bigPictureElements.commentsTotalCount.textContent = commentsNumber;

  if (commentsList.length < MAX_COMMENTS_VISIBLE){
    visibleCommentsCount = commentsList.length;
  } else {
    visibleCommentsCount = MAX_COMMENTS_VISIBLE;
  }
  bigPictureElements.commentsCount.textContent =visibleCommentsCount;
  if (visibleCommentsCount >= commentsList.length) {
    bigPictureElements.commentsLoaderButton.classList.add('hidden');
  }


  renderComments(commentsList, visibleCommentsCount);

  onLoadMoreComments = function () {
    loadMoreComments(commentsList);
  };

  bigPictureElements.commentsLoaderButton.addEventListener('click', onLoadMoreComments);

  bigPictureElements.closeBigPictureButton.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
};


function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureElements.commentsLoaderButton.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureElements.closeBigPictureButton.removeEventListener('click', closeBigPicture);
  bigPictureElements.commentsLoaderButton.removeEventListener('click', onLoadMoreComments);
  visibleCommentsCount = 0;
}

export {openBigPicture};
