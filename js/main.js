import './upload-photo/render-upload-form.js';
import './network-api.js';
import { getData } from './network-api.js';
import { filterDefaultClick, renderThumbnails, filterRandomClick, filterDiscussedClick } from './render-thumbnails.js';
import {debounce, showAlert} from './utils.js';

const RERENDER_DELAY = 500;

getData()
  .then((thumbnails) => {
    renderThumbnails(thumbnails);
    filterDefaultClick(debounce(() => renderThumbnails(thumbnails), RERENDER_DELAY));
    filterRandomClick(debounce(() => renderThumbnails(thumbnails), RERENDER_DELAY));
    filterDiscussedClick(debounce(() => renderThumbnails(thumbnails), RERENDER_DELAY));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
