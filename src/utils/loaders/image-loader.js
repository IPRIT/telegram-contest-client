import { DownloadOperation } from './download-operation/index';

export class ImageLoader extends DownloadOperation {

  /**
   * @param {string} imageUrl
   * @returns {Promise<*>}
   * @private
   */
  async download (imageUrl) {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        return resolve();
      }

      const image = window.Image
        ? new Image()
        : document.createElement( 'image' );

      image.onload = event => resolve( image );
      image.onerror = error => reject( error );

      image.src = imageUrl;
    });
  }
}
