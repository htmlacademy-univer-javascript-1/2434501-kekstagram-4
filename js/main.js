import './upload-photo/render-upload-form.js';
import './network-api.js';
import { getData } from './network-api.js';
import { filterDefaultClick, renderThumbnails, filterRandomClick, filterDiscussedClick } from './render-thumbnails.js';
import {showAlert} from './utils.js';

getData()
  .then((thumbnails) => {
    renderThumbnails(thumbnails);
    filterDefaultClick(() => renderThumbnails(thumbnails));
    filterRandomClick(() => renderThumbnails(thumbnails));
    filterDiscussedClick(() => renderThumbnails(thumbnails));
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
