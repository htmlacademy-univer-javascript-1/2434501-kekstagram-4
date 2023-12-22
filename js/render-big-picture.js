import {isEscapeKey} from './utils.js';

const MAX_COMMENTS_VISIBLE = 5;
let visibleCommentsCount;

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
  bigPictureElements.comments.innerHTML = '';
  // console.log(visibleCommentsCount);
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
    // console.log('Загрузка if');
    bigPictureElements.commentsCount.textContent = commentsList.length;
    visibleCommentsCount = commentsList.length;
    bigPictureElements.commentsLoaderButton.classList.add('hidden');
  } else {
    // console.log('Загрузка else');
    visibleCommentsCount += MAX_COMMENTS_VISIBLE;
    bigPictureElements.commentsCount.textContent = visibleCommentsCount;
  }
  // console.log('Теперь видно ком.', visibleCommentsCount);
  renderComments(commentsList, visibleCommentsCount);
};


const openBigPicture = function (url, description, likesNumber, commentsNumber, commentsList) {
  bigPicture.classList.remove('hidden');
  // bigPictureElements.commentsCount.classList.add('hidden');
  // bigPictureElements.commentsLoaderButton.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPictureElements.img.src = url;
  bigPictureElements.caption.textContent = description;
  bigPictureElements.likes.textContent = likesNumber;
  bigPictureElements.commentsTotalCount.textContent = commentsNumber;

  visibleCommentsCount = MAX_COMMENTS_VISIBLE;

  bigPictureElements.commentsCount.textContent =
    commentsList.length <= visibleCommentsCount
      ? commentsList.length
      : visibleCommentsCount;
  if (visibleCommentsCount >= commentsList.length) {
    bigPictureElements.commentsLoaderButton.classList.add('hidden');
  }


  // console.log('Видно ком.', visibleCommentsCount);
  renderComments(commentsList, visibleCommentsCount);

  const onLoadMoreComments = function () {
    // console.log('current coms', visibleCommentsCount);
    loadMoreComments(commentsList);
  };

  bigPictureElements.commentsLoaderButton.addEventListener('click', onLoadMoreComments);

  bigPictureElements.closeBigPictureButton.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
};


const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureElements.commentsLoaderButton.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureElements.closeBigPictureButton.removeEventListener('click', closeBigPicture);
  bigPictureElements.commentsLoaderButton.removeEventListener('click', openBigPicture.onLoadMoreComments);
  visibleCommentsCount = 0;
};

export {openBigPicture};
