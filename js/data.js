import { generateRandomIntegerFromRange } from './utils.js';
import { getRandomInteger } from './utils.js';

const PHOTO_COUNT = 25;

const DESCRIPTION = 'Описание фотографии';

const COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Полина', 'Арсений', 'Ариана', 'Кирилл', 'София', 'Агата', 'Мария', 'Камила', 'Давид', 'Алиса', 'Ульяна', 'Милана', 'Варвара',
  'Дмитрий', 'Арина', 'Ксения', 'Тимур', 'Никита', 'Артём', 'Михаил'];


const generatePhotoID = generateRandomIntegerFromRange(1, 25);
const generatePhotoUrlID = generateRandomIntegerFromRange(1, 25);
function generatePhotoUrl () {
  return `photos/${  generatePhotoUrlID()  }.jpg`;
}

const generateCommentID = generateRandomIntegerFromRange(1, 999);
function generateAvatarUrl () {
  return `img/avatar-${  getRandomInteger(1, 6)  }.svg`;
}


function generatePhoto () {
  return {
    id: generatePhotoID(),
    url: generatePhotoUrl(),
    description: DESCRIPTION,
    likes: getRandomInteger(15, 200),
    comments: getComments()
  };
}

function generateComment () {
  return {
    id: generateCommentID(),
    avatar: generateAvatarUrl(),
    message: getCommentMessage(),
    name: getName()
  };
}

function getRandomArrayElement (array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function getCommentMessage () {
  const stringCount = getRandomInteger(1, 2);
  let messageText = getRandomArrayElement(COMMENTS);
  if (stringCount === 2) {
    let secondSentence = getRandomArrayElement(COMMENTS);
    while (secondSentence === messageText){
      secondSentence = getRandomArrayElement(COMMENTS);
    }
    messageText = `${messageText} ${secondSentence}`;
  }
  return messageText;
}

function getName () {
  return getRandomArrayElement(NAMES);
}

function getComments(){
  return Array.from({length: getCommentsCount()}, generateComment);
}

function getCommentsCount () {
  return getRandomInteger(0, 30);
}

function getPublishedPhotos () {
  return Array.from({length: PHOTO_COUNT}, generatePhoto);
}

export {getPublishedPhotos};
