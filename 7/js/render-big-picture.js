import { isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture')

const bigPictureElements = {
  img: bigPicture.querySelector('.big-picture__img').querySelector('img'),
  likes: bigPicture.querySelector('.likes-count'),
  commentsCount: bigPicture.querySelector('.social__comment-count'),
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

const onCloseBigPictureButton = function () {
  closeBigPicture();
};


const openBigPicture = function (url, description, likesNumber, commentsNumber, commentsList) {
  bigPicture.classList.remove('hidden');
  bigPictureElements.commentsCount.classList.add('hidden');
  bigPictureElements.commentsLoaderButton.classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPictureElements.img.src = url;
  bigPictureElements.caption.textContent = description;
  bigPictureElements.likes.textContent = likesNumber;
  bigPictureElements.commentsTotalCount.textContent = commentsNumber;

  commentsList.forEach((element) => {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    bigPictureElements.comments.appendChild(comment);
  });

  bigPictureElements.closeBigPictureButton.addEventListener('click', onCloseBigPictureButton);
  document.addEventListener('keydown', onDocumentKeydown);
};


const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureElements.closeBigPictureButton.removeEventListener('click', closeBigPicture);
  bigPictureElements.comments.innerHTML = '';
};

export {openBigPicture};
